"use strict";
var Check = /** @class */ (function () {
    function Check() {
        this.message = "Check message!!";
    }
    Check.prototype.callBackFunction = function (textToPrint) {
        console.log("Inside callback function " + textToPrint);
    };
    Check.prototype.checkCallBack = function (mainLine, callBackFunction) {
        console.log("Inside main function : " + mainLine);
        callBackFunction("Send from main....");
    };
    Check.prototype.showMessage = function () {
        console.log(this.message + " with door state : " + 10 /* Closed */);
    };
    Check.prototype.multiArgs = function (title) {
        var numbers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            numbers[_i - 1] = arguments[_i];
        }
        var nums = numbers;
        console.log(title + " - All array data " + nums);
    };
    Check.prototype.concatStrings = function (a, b, c) {
        return a + b + c;
    };
    Check.prototype.concatStringsDefault = function (a, b, c) {
        if (c === void 0) { c = "c"; }
        return a + b + c;
    };
    return Check;
}());
var object = new Check();
object.showMessage();
var concat3strings = object.concatStrings("a", "b", "c");
console.log("concat3strings : " + concat3strings);
var concat2strings = object.concatStringsDefault("a", "b");
console.log("concat2strings : " + concat2strings);
object.multiArgs("Hello ---", 1, 2, 3, 4, 5);
object.checkCallBack("---------------", object.callBackFunction);
//console.log(`multiargs : ${object.multiArgs(1, 2, 3, 4, 5)}`);
//# sourceMappingURL=hello.js.map