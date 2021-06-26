//console.log('Hello');

const enum DoorState { Open, Closed, Ajar };
interface IOptionalProp {
    id: number;
    name?: string;
}
class MyClass {
    obj: any = { id: 1, name: "Rahul" };
    private message: string = 'Hello world!';
    private uType : string | number = "";
    ShowMessage(): void {
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
        let obj3 = { ...nameObj, ...idObj };
        console.log(`obj3.id : ${obj3.id}`);
        console.log(`obj3.name : ${obj3.name}`);

        let idOnly: IOptionalProp = { id: 1 };
        let idAndName: IOptionalProp = { id: 2, name: "idAndName" };

        idOnly = idAndName;

    }
}

var obj: MyClass = new MyClass();
obj.ShowMessage();
