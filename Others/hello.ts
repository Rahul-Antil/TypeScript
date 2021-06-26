const enum DoorState {
  Open = 7,
  Closed = 10,
  Ajar = 12
}

class Check {
  private message: string = "Check message!!";

  callBackFunction(textToPrint: string): void {
    console.log(`Inside callback function ${textToPrint}`);
  }
  checkCallBack(
    mainLine: string,
    callBackFunction: (textToPrint: string) => void
  ) {
    console.log(`Inside main function : ${mainLine}`);
    callBackFunction("Send from main....");
  }

  showMessage(): void {
    console.log(`${this.message} with door state : ${DoorState.Closed}`);
  }
  multiArgs(title: string, ...numbers: number[]): void {
    var nums: number[] = numbers;
    console.log(`${title} - All array data ${nums}`);
  }
  concatStrings(a: string, b: string, c?: string) {
    return a + b + c;
  }
  concatStringsDefault(a: string, b: string, c: string = "c") {
    return a + b + c;
  }
}

let object: Check = new Check();
object.showMessage();
var concat3strings = object.concatStrings("a", "b", "c");
console.log(`concat3strings : ${concat3strings}`);
var concat2strings = object.concatStringsDefault("a", "b");
console.log(`concat2strings : ${concat2strings}`);
object.multiArgs("Hello ---", 1, 2, 3, 4, 5);
object.checkCallBack("---------------", object.callBackFunction);

fetch(`https://query1.finance.yahoo.com/v7/finance/download/MBINP?period1=511056000&period2=1599436800&interval=1d&events=history`)
.then(res => res.json())
.then((res: any) => {
    console.log("data:", res)
});

//console.log(`multiargs : ${object.multiArgs(1, 2, 3, 4, 5)}`);
