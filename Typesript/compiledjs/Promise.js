"use strict";
// Firstly, to use promises, you must return a new promise object.
// Secondly, a promise object is constructed with a function that takes two callback arguments.
// Make sure ES6 versoin configured in tsconfig file "target": "es6"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function delayedPromise() {
    return new Promise((resolve, reject) => {
        function afterTimeout() {
            resolve();
        }
        setTimeout(afterTimeout, 2000);
    });
}
console.log(`Calling promise...`);
delayedPromise().then(() => {
    console.log(`After promise success.`);
});
function delayedPromiseWithParam() {
    return new Promise((resolve, reject) => {
        function afterWait() {
            resolve("resolved_within_promise");
        }
        setTimeout(afterWait, 2000);
    });
}
function callPromiseWithParam() {
    console.log(`calling delayedPromiseWithParam`);
    delayedPromiseWithParam().then((message) => {
        console.log(`Promise.then() returned ${message} `);
    });
}
callPromiseWithParam();
function awaitDelayed() {
    return new Promise((resolve, reject) => {
        function afterWait() {
            console.log(`calling resolve`);
            resolve();
        }
        setTimeout(afterWait, 1000);
    });
}
function callAwaitDelayed() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`call awaitDelayed`);
        yield awaitDelayed();
        console.log(`after awaitDelayed`);
    });
}
callAwaitDelayed();
//# sourceMappingURL=Promise.js.map