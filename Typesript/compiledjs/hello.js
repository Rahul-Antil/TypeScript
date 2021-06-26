"use strict";
//console.log('Hello');
;
class MyClass {
    constructor() {
        this.obj = { id: 1, name: "Rahul" };
        this.message = 'Hello world!';
        this.uType = "";
    }
    ShowMessage() {
        //this.obj = { ID: 2 };
        console.log(`message printed : ${this.obj.name + ' ' + this.message}`);
        this.uType = 1;
        console.log(`Union Type with Number : ${this.uType}`);
        console.log(`Type of Union Type with Number :` + typeof (this.uType));
        this.uType = "string data value";
        console.log(`Union Type with String : ${this.uType}`);
        console.log(`Type of Union Type with String :` + typeof (this.uType));
        let nameObj = { name: "nameObj" };
        let idObj = { id: 2 };
        let obj3 = Object.assign({}, nameObj, idObj);
        console.log(`obj3.id : ${obj3.id}`);
        console.log(`obj3.name : ${obj3.name}`);
        let idOnly = { id: 1 };
        let idAndName = { id: 2, name: "idAndName" };
        idOnly = idAndName;
    }
}
var obj = new MyClass();
obj.ShowMessage();
//# sourceMappingURL=hello.js.map