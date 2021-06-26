"use strict";
class Concatenator {
    concatenateArray(inputArray) {
        let returnString = "";
        for (let index = 0; index < inputArray.length; index++) {
            if (index > 0)
                returnString += ",";
            returnString += inputArray[index].toString();
        }
        return returnString;
    }
}
let stringConcat = new Concatenator();
let numConcat = new Concatenator();
let stringArray = ["First", "Second", "Third"];
let numberArray = [1, 2, 3];
console.log(`String concat result : ${stringConcat.concatenateArray(stringArray)}`);
console.log(`Number concat result : ${numConcat.concatenateArray(numberArray)}`);
class FirstClass {
    constructor() {
        this.id = 0;
    }
}
class SecondClass {
    constructor() {
        this.name = '';
    }
}
class GenericCreator {
    create(arg1) {
        return new arg1();
    }
}
var creator1 = new GenericCreator();
var firstClass = creator1.create(FirstClass);
var creator2 = new GenericCreator();
var secondClass = creator2.create(SecondClass);
console.log(`First creater called with value : ${firstClass.id}`);
//# sourceMappingURL=Generic.js.map