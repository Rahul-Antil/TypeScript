"use strict";
var PersonCategory;
(function (PersonCategory) {
    PersonCategory[PersonCategory["Infant"] = 0] = "Infant";
    PersonCategory[PersonCategory["Child"] = 1] = "Child";
    PersonCategory[PersonCategory["Adult"] = 2] = "Adult";
})(PersonCategory || (PersonCategory = {}));
class Person {
    constructor(dateOfBirth) {
        this.Category = PersonCategory.Infant;
        this.DateOfBirth = dateOfBirth;
    }
    printDetails() {
        console.log('Person :');
        console.log(`Date of birth :  ${this.DateOfBirth.toDateString()}`);
        console.log(`Category : ${PersonCategory[this.Category]}`);
        console.log(`Can Sign Contracts : ${this.canSignContracts()}`);
    }
}
class Infant extends Person {
    constructor(dateOfBirth) {
        super(dateOfBirth);
        this.Category = PersonCategory.Infant;
    }
    canSignContracts() { return false; }
}
class Child extends Person {
    constructor(dateOfBirth) {
        super(dateOfBirth);
        this.Category = PersonCategory.Child;
    }
    canSignContracts() { return false; }
}
class Adult extends Person {
    constructor(dateOfBirth) {
        super(dateOfBirth);
        this.Category = PersonCategory.Adult;
    }
    canSignContracts() { return true; }
}
class PersonFactory {
    getPerson(dateOfBirth) {
        let dateNow = new Date();
        let currentMonth = dateNow.getMonth() + 1;
        let currentDate = dateNow.getDate();
        let dateTwoYearsAgo = new Date(dateNow.getFullYear() - 2, currentMonth, currentDate);
        let date18YearsAgo = new Date(dateNow.getFullYear() - 18, currentMonth, currentDate);
        if (dateOfBirth >= dateTwoYearsAgo) {
            return new Infant(dateOfBirth);
        }
        else if (dateOfBirth >= date18YearsAgo) {
            return new Child(dateOfBirth);
        }
        else {
            return new Adult(dateOfBirth);
        }
    }
}
let factory = new PersonFactory();
let p1 = factory.getPerson(new Date(2015, 0, 20));
p1.printDetails();
let p2 = factory.getPerson(new Date(2000, 0, 20));
p2.printDetails();
let p3 = factory.getPerson(new Date(1969, 0, 20));
p3.printDetails();
//# sourceMappingURL=FactoryPattern.js.map