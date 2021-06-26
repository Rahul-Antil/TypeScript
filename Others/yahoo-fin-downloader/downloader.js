const fetch = require("node-fetch");
const Buffer = require('buffer').Buffer;
const fs = require('fs');

async function download() {
  try {
    
    const NASDAQ = fs.readFileSync('Symbols/NASDAQ-Symbols.txt', 'utf8');
    const NYSE = fs.readFileSync('Symbols/NYSE-Symbols.txt', 'utf8');
    
    var nasdaq_symbols = NASDAQ.split("\r\n");
    var nyse_symbols = NYSE.split("\r\n");
    
    var startDay = new Date(1986, 03, 13); //1599436800
    var endDay = new Date();
    var s = Math.floor(startDay.getTime() / 1000)
    var e = Math.floor(endDay.getTime() / 1000)
    
    for (let index = 0; index < nasdaq_symbols.length; index++) {
      const sym = nasdaq_symbols[index];
      console.log(`Downloading NASDAQ | [${index + 1}] of [${nasdaq_symbols.length}] : [${sym}]`);
      try {
        var u = `https://query1.finance.yahoo.com/v7/finance/download/${encodeURI(sym)}?period1=${s}&period2=${e}&interval=1d&events=history`;
        await fetch(u)
          .then(function (response) {
            return response.text();
          }).then(function (data) {
            if (data.toString().startsWith("Date,Open")) {
              fs.writeFile(`downloads//NASDAQ/${sym}.csv`, data, function (err) {
                if (err) console.log("ERROR #1 : Downloading data", err)
              });
            }
          });
      } catch (e) {
        console.log("ERROR #2 : Downloading data", e)
      }
    }

    for (let index = 0; index < nyse_symbols.length; index++) {
      const sym = nyse_symbols[index];
      console.log(`Downloading NYSE | [${index + 1}] of [${nyse_symbols.length}] : [${sym}]`);
      try {
        var u = `https://query1.finance.yahoo.com/v7/finance/download/${encodeURI(sym)}?period1=${s}&period2=${e}&interval=1d&events=history`;
        await fetch(u)
          .then(function (response) {
            return response.text();
          }).then(function (data) {
            if (data.toString().startsWith("Date,Open")) {
              fs.writeFile(`downloads//NYSE/${sym}.csv`, data, function (err) {
                if (err) console.log("ERROR #3 : Downloading data", err)
              });
            }
          });
      } catch (e) {
        console.log("ERROR #4 : Downloading data", e)
      }
    }


    // nyse_symbols.forEach(sym => {
    //   console.log("Downloading data for : ", sym);
    //   try {
    //     var u = `https://query1.finance.yahoo.com/v7/finance/download/${encodeURI(sym)}?period1=${s}&period2=${e}&interval=1d&events=history`;
    //     fetch(u)
    //       .then(function (response) {
    //         return response.text();
    //       }).then(function (data) {
    //         fs.writeFile(`downloads//NYSE/${sym}.csv`, data, function (err) {
    //           if (err) console.log("ERROR #3 : Downloading data", err)
    //         });
    //       });
    //   } catch (e) {
    //     console.log("ERROR #4 : Downloading data", e)
    //   }
    // });

  } catch (error) {
    console.log("ERROR #5: Looping Symbols", error)
  }
}

const start = async function () {
  await download();
}
//start();