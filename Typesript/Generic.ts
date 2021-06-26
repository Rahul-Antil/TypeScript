class Concatenator<T> {
  concatenateArray(inputArray: Array<T>): string {
    let returnString = "";
    for (let index = 0; index < inputArray.length; index++) {
      if (index > 0) returnString += ",";
      returnString += inputArray[index].toString();
    }
    return returnString;
  }
}

let stringConcat = new Concatenator<string>();
let numConcat = new Concatenator<number>();
let stringArray: string[] = ["First", "Second", "Third"];
let numberArray: number[] = [1, 2, 3];
console.log(
  `String concat result : ${stringConcat.concatenateArray(stringArray)}`
);
console.log(
  `Number concat result : ${numConcat.concatenateArray(numberArray)}`
);

class FirstClass {
  id: number = 0;
}
class SecondClass {
  name: string = '';
}

class GenericCreator<T> {
  create(arg1: { new (): T }): T {
    return new arg1();
  }
}

var creator1 = new GenericCreator<FirstClass>();
var firstClass: FirstClass = creator1.create(FirstClass);
var creator2 = new GenericCreator<SecondClass>();
var secondClass: SecondClass = creator2.create(SecondClass);

console.log(`First creater called with value : ${firstClass.id}`);
