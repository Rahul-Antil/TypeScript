
GO
CREATE TABLE StocksInput
(
 ID INT IDENTITY(1,1) PRIMARY KEY,
 StockName NVARCHAR(200),
 SExchangeDate  DateTime NOT NULL,
 SOpen DECIMAL(18,2),
 SHigh DECIMAL(18,2),
 SLow DECIMAL(18,2),
 SClose DECIMAL(18,2),
 SVolume INT,
 Soi INT,
 IsActive BIT DEFAULT 1,
 Created DateTime DEFAULT GETDATE()
)
CREATE INDEX idx_edate ON StocksInput (SExchangeDate)
CREATE INDEX idx_sname ON StocksInput (StockName)
CREATE INDEX idx_open ON StocksInput (SOpen)
CREATE INDEX idx_high ON StocksInput (SHigh)
CREATE INDEX idx_low ON StocksInput (SLow)
CREATE INDEX idx_close ON StocksInput (SClose)

GO
--ADF Pipeline sync data from NYSE and NASDAQ files storage to staging and merged in below table
CREATE TABLE CompanyStocks
(
 ID INT IDENTITY(1,1) PRIMARY KEY,
 ExchangeName NVARCHAR(200),
 StockName NVARCHAR(200),
 SExchangeDate  DateTime NOT NULL,
 SOpen DECIMAL(18,6),
 SHigh DECIMAL(18,6),
 SLow DECIMAL(18,6),
 SClose DECIMAL(18,6),
 AdjClose DECIMAL(18,6),
 SVolume BIGINT,
 IsActive BIT DEFAULT 1,
 Created DateTime DEFAULT GETDATE()
)
CREATE INDEX idx_cs_ename ON CompanyStocks (ExchangeName)
CREATE INDEX idx_cs_sname ON CompanyStocks (StockName)
CREATE INDEX idx_cs_edate ON CompanyStocks (SExchangeDate)
CREATE INDEX idx_cs_open ON CompanyStocks (SOpen)
CREATE INDEX idx_cs_high ON CompanyStocks (SHigh)
CREATE INDEX idx_cs_low ON CompanyStocks (SLow)
CREATE INDEX idx_cs_close ON CompanyStocks (SClose)




GO
CREATE TABLE StockSymbols
(
 ID INT IDENTITY(1,1) PRIMARY KEY,
 Symbol NVARCHAR(50),
 SDescription NVARCHAR(50),
 Exchange NVARCHAR(50),
 IsActive BIT DEFAULT 1,
 Created DateTime DEFAULT GETDATE()
)

GO
CREATE TABLE StocksStaging
(
 StockName NVARCHAR(200),
 SExchangeDate  NVARCHAR(200),
 SOpen NVARCHAR(200),
 SHigh NVARCHAR(200),
 SLow NVARCHAR(200),
 SClose NVARCHAR(200),
 SVolume NVARCHAR(200),
 Soi NVARCHAR(200),
)
GO
CREATE TABLE CompanyStocksStaging
(
 ExchangeName NVARCHAR(200),
 StockName NVARCHAR(200),
 SExchangeDate  NVARCHAR(200),
 SOpen NVARCHAR(200),
 SHigh NVARCHAR(200),
 SLow NVARCHAR(200),
 SClose NVARCHAR(200),
 AdjClose NVARCHAR(200),
 SVolume NVARCHAR(200),
)



GO 
CREATE OR ALTER PROC MERGE_RAW_INPUT
AS
	BEGIN
		DELETE FROM StocksStaging WHERE SExchangeDate IS NULL or LEN(TRIM(SExchangeDate)) = 0
		INSERT INTO StocksInput(StockName,SExchangeDate,SOpen,SHigh,SLow,SClose,SVolume,Soi)
		SELECT  
		StockName, datefromparts(SUBSTRING(SExchangeDate,1,4), SUBSTRING(SExchangeDate,5,2), SUBSTRING(SExchangeDate,7,2)),
		TRY_CAST(SOpen AS DECIMAL(18,2)), TRY_CAST(SHigh AS DECIMAL(18,2)), TRY_CAST(SLow AS DECIMAL(18,2)), TRY_CAST(SClose AS DECIMAL(18,2)),
		TRY_CAST(SVolume AS INT), TRY_CAST(Soi AS INT) FROM StocksStaging
	END

GO
CREATE OR ALTER PROC MERGE_COMPANY_STOCKS_INPUT(@ExchangeName AS nvarchar(200))
AS
	BEGIN
		--DECLARE @StockName as nvarchar(200)
		--SET @StockName = (SELECT TOP 1 StockName FROM (SELECT DISTINCT(REPLACE(StockName, '.csv', '')) as StockName FROM CompanyStocksStaging) AS T)
		--DELETE FROM CompanyStocks WHERE ExchangeName = @ExchangeName and StockName=@StockName
		--DELETE FROM CompanyStocks WHERE ExchangeName = @ExchangeName
		DELETE FROM CompanyStocksStaging WHERE SExchangeDate IS NULL or LEN(TRIM(SExchangeDate)) = 0

		INSERT INTO CompanyStocks(ExchangeName, StockName,SExchangeDate,SOpen,SHigh,SLow,SClose,AdjClose, SVolume)
		SELECT @ExchangeName, REPLACE(StockName, '.csv', ''), SExchangeDate,
		TRY_CAST(SOpen AS DECIMAL(18,6)), TRY_CAST(SHigh AS DECIMAL(18,6)), TRY_CAST(SLow AS DECIMAL(18,6)), TRY_CAST(SClose AS DECIMAL(18,6)),
		TRY_CAST(AdjClose AS DECIMAL(18,6)), TRY_CAST(SVolume AS BIGINT) FROM CompanyStocksStaging 

		--INSERT INTO CompanyStocks(ExchangeName, StockName,SExchangeDate,SOpen,SHigh,SLow,SClose,AdjClose, SVolume)
		--SELECT @ExchangeName, REPLACE(StockName, '.csv', ''), SExchangeDate , SOpen, SHigh, SLow , SClose, AdjClose , SVolume FROM CompanyStocksStaging

		--INSERT INTO CompanyStocks(ExchangeName, StockName,SExchangeDate,SOpen,SHigh,SLow,SClose,AdjClose, SVolume)
		--SELECT 
		--@ExchangeName, REPLACE(StockName, '.csv', ''),  
		--datefromparts(SUBSTRING(SExchangeDate,1,4), SUBSTRING(SExchangeDate,6,2), SUBSTRING(SExchangeDate,9,2)),
		--TRY_CAST(SOpen AS DECIMAL(18,6)), TRY_CAST(SHigh AS DECIMAL(18,6)), TRY_CAST(SLow AS DECIMAL(18,6)), TRY_CAST(SClose AS DECIMAL(18,6)),
		--TRY_CAST(AdjClose AS DECIMAL(18,6)), TRY_CAST(SVolume AS BIGINT) FROM CompanyStocksStaging 
	END

GO



--EXEC sp_spaceused

-- DBCC SHRINKDATABASE ('stocks-research-db', 10);

--TRUNCATE TABLE  StocksStaging
--TRUNCATE TABLE  StocksInput

--TRUNCATE TABLE  CompanyStocksStaging
--TRUNCATE TABLE  CompanyStocks
--DELETE FROM CompanyStocks where ExchangeName='NASDAQ' and  SOpen is null
--DELETE FROM CompanyStocks where ExchangeName='NYSE' and  SOpen is null

--TRUNCATE TABLE  StockSymbols

--EXEC MERGE_COMPANY_STOCKS_INPUT 'NASDAQ'


SELECT COUNT(*) FROM StocksStaging

SELECT TOP 1000 * FROM StocksStaging

SELECT COUNT(*) FROM StocksInput

SELECT TOP 1000 * FROM StocksInput 



SELECT COUNT(*) FROM CompanyStocksStaging

SELECT COUNT(*) FROM CompanyStocksStaging where ExchangeName='NASDAQ'

SELECT COUNT(*) FROM CompanyStocksStaging where ExchangeName='NYSE'

SELECT TOP 1000 * FROM CompanyStocksStaging 

SELECT TOP 1000 * FROM CompanyStocksStaging where ExchangeName='NASDAQ'

SELECT TOP 1000 * FROM CompanyStocksStaging where ExchangeName='NYSE'


SELECT COUNT(*) FROM CompanyStocks

SELECT COUNT(*) FROM CompanyStocks where ExchangeName='NASDAQ'

SELECT COUNT(*) FROM CompanyStocks where ExchangeName='NYSE'

SELECT TOP 1000 * FROM CompanyStocks 

SELECT TOP 1000 * FROM CompanyStocks where ExchangeName='NASDAQ'

SELECT TOP 1000 * FROM CompanyStocks where ExchangeName='NYSE'


SELECT COUNT(*) FROM StockSymbols

SELECT TOP 1000 * FROM StockSymbols


SELECT COUNT(*) FROM NSE

SELECT TOP 1000 * FROM NSE

SELECT COUNT(*) FROM NYSE

SELECT TOP 1000 * FROM NYSE

SELECT COUNT(*) FROM NASDAQ

SELECT TOP 1000 * FROM NASDAQ



SELECT TOP 1000 *, REPLACE(StockName, '.csv', '') as S, TRY_CAST(SExchangeDate as datetime) d FROM CompanyStocksStaging 

SELECT TOP 100000 ExchangeName, REPLACE(StockName, '.csv', ''), SExchangeDate , SOpen, SHigh, SLow , SClose, AdjClose , SVolume FROM CompanyStocksStaging 

SELECT * FROM CompanyStocks where SOpen is null

SELECT COUNT(*) FROM CompanyStocks where ExchangeName='NASDAQ'



--GO
--CREATE TABLE NSE
--(
-- ID INT IDENTITY(1,1) PRIMARY KEY,
-- ExchangeName NVARCHAR(50),
-- StockName NVARCHAR(50),
-- SExchangeDate Date NOT NULL,
-- SOpen DECIMAL(18,2),
-- SHigh DECIMAL(18,2),
-- SLow DECIMAL(18,2),
-- SClose DECIMAL(18,2),
-- SVolume BIGINT,
-- IsActive BIT DEFAULT 1,
-- Created DateTime DEFAULT GETDATE()
--)
--CREATE INDEX IDX_NSE_StockName ON NSE(StockName)
--CREATE INDEX IDX_NSE_ExchangeDate ON NSE(SExchangeDate)

--SELECT COUNT(*) FROM StocksInput								 -- 1808050
--INSERT INTO NSE(ExchangeName, StockName , SExchangeDate, SOpen, SHigh, SLow, SClose, SVolume)
--SELECT 'NSE', StockName, SExchangeDate , SOpen, SHigh, SLow , SClose,  SVolume FROM StocksInput

--GO

--GO
--CREATE TABLE NYSE
--(
-- ID INT IDENTITY(1,1) PRIMARY KEY,
-- ExchangeName NVARCHAR(50),
-- StockName NVARCHAR(50),
-- SExchangeDate Date NOT NULL,
-- SOpen DECIMAL(18,2),
-- SHigh DECIMAL(18,2),
-- SLow DECIMAL(18,2),
-- SClose DECIMAL(18,2),
-- SVolume BIGINT,
-- IsActive BIT DEFAULT 1,
-- Created DateTime DEFAULT GETDATE()
--)
--CREATE INDEX IDX_NYSE_StockName ON NYSE(StockName)
--CREATE INDEX IDX_NYSE_ExchangeDate ON NYSE(SExchangeDate)

--SELECT COUNT(*) FROM CompanyStocks where ExchangeName='NYSE'   -- 11895954
--INSERT INTO NYSE(ExchangeName, StockName , SExchangeDate, SOpen, SHigh, SLow, SClose, SVolume)
--SELECT ExchangeName, StockName, SExchangeDate , SOpen, SHigh, SLow , SClose,  SVolume FROM CompanyStocks where ExchangeName='NYSE'


--GO

--GO
--CREATE TABLE NASDAQ
--(
-- ID INT IDENTITY(1,1) PRIMARY KEY,
-- ExchangeName NVARCHAR(50),
-- StockName NVARCHAR(50),
-- SExchangeDate Date NOT NULL,
-- SOpen DECIMAL(18,2),
-- SHigh DECIMAL(18,2),
-- SLow DECIMAL(18,2),
-- SClose DECIMAL(18,2),
-- SVolume BIGINT,
-- IsActive BIT DEFAULT 1,
-- Created DateTime DEFAULT GETDATE()
--)
--CREATE INDEX IDX_NASDAQ_StockName ON NASDAQ(StockName)
--CREATE INDEX IDX_NASDAQ_ExchangeDate ON NASDAQ(SExchangeDate)

--SELECT COUNT(*) FROM CompanyStocks where ExchangeName='NASDAQ' -- 10723659
--INSERT INTO NASDAQ (ExchangeName, StockName , SExchangeDate, SOpen, SHigh, SLow, SClose, SVolume)
--SELECT ExchangeName, StockName, SExchangeDate , SOpen, SHigh, SLow , SClose,  SVolume FROM CompanyStocks where ExchangeName='NASDAQ'

--GO




