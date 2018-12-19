let __extends = (this && this.__extends) || (function () {
    let extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (let p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
let Student = /** @class */ (function () {
    function Student(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + lastName;
    }
    return Student;
}());
var greeter = function (person) { return ("Hello " + person.firstName.toUpperCase() + " " + person.lastName.toUpperCase()); };
var user = new Student("oleg", "zaiats");
document.body.innerHTML = greeter(user);
/*Basic Types*/
var isDone = false;
var decimal = 5;
var hex = 0xf00d;
var binary = 10;
var octal = 484;
var fullName = "Bob Bobbington";
var age = 37;
/*Interpolation*/
var sentence = "Hello, my name is " + fullName + ". I'll be " + (age + 1) + " years old next month.";
console.log(sentence);
/*Complex Data Types*/
// Vector. type of elements followed by [];
var list = [1, 2, 3, 4, 5];
// Vector. Generic Array Type;
var genericList = [12, 4, 5, 2, 3, 21];
/*TUPLE. Набор. Кортеж.*/
// Declaration
var x;
// Initialization
x = ["Cat", 3];
// Incorrect
// x = ["Dog", "wife"]; Error:(46, 13) TS2322: Type 'string' is not assignable to type 'number'.
/*ENUMERABLE. СЧЕТНИЙ. ПЕРЕЧИСЛИСИЙ.*/
var Gender;
(function (Gender) {
    Gender[Gender["MALE"] = 0] = "MALE";
    Gender[Gender["FEMALE"] = 1] = "FEMALE";
    Gender[Gender["UNKNOWN"] = 2] = "UNKNOWN";
})(Gender || (Gender = {}));
var olegGender = Gender[1];
/*ANY*/
/*These values may come from dynamic content, e.g. from the user or a 3rd party library*/
var notSure = "whatEver";
notSure = 42;
var unsureList = [1, true, "free"];
list[1] = 100;
console.log(unsureList);
/*VOID.Not returning value*/
var warnUser = function () {
    console.log("This is my warning message");
};
warnUser();
/*Declaring variables of type void is not useful because you can only assign undefined or null to them:*/
var unusable;
/*Never*/
/*A function that doesn't explicitly return a value implicitly returns the value undefined in JavaScript.
Although we typically say that such a function "doesn't return anything", it returns. We usually ignore the
return value in these cases. Such a function is inferred to have a void return type in TypeScript.
A function that has a never return type never returns. It doesn't return undefined, either. The function doesn't
have a normal completion, which means it throws an error or never finishes running at all.*/
// Function returning never must have unreachable end point
function error(message) {
    throw new Error(message);
}
function infiniteLoop() {
    while (true) {
    }
}
function f(_a) {
    var a = _a.a, b = _a.b;
    // ...
}
var printLabel = function (input) {
    console.log(input.label);
};
var obj = { size: 32, label: "testing interfaces" };
printLabel(obj);
/*
function (argument: argumentType): returnType {
    return value;
}
const foo = (a: type, b: type): returnType => { return ... };
*/
var foo = function (a, b) {
    return (a + b).toString();
};
console.log(foo(23, 4));
var createSquare = function (config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.height) {
        newSquare.area = Math.pow(config.height, 2);
    }
    return newSquare;
};
var s = createSquare({ color: "black", height: 15 });
console.log(s);
var p1 = { x: 32, y: 12 };
/*p1.x = 34; Error:(151, 4) TS2540: Cannot assign to 'x' because it is a constant or a read-only property.*/
/*ReadonlyArray<number> ready type with all array mutating methods removed*/
var a = [1, 2, 3, 4, 5, 7];
var b = [4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7];
a[2] = 321;
console.log(a[2]);
// Error:(171, 46) TS2322: Type 'number' is not assignable to type 'string'.
/*let test: indexArray = ['asd', 'asdf', '324', 324];*/
var test2 = ["asdf", "wer", "qwe"];
var myArray = ["Alice", "Bob"];
var Clock = /** @class */ (function () {
    function Clock(h, m) {
    }
    Clock.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock;
}());
var createClock = function (ctor, hour, minute) {
    return new ctor(hour, minute);
};
var DigitalClock = /** @class */ (function () {
    function DigitalClock(h, m) {
    }
    DigitalClock.prototype.tick = function () {
        console.log("beep, beep");
    };
    return DigitalClock;
}());
var AnalogClock = /** @class */ (function () {
    function AnalogClock(h, m) {
    }
    AnalogClock.prototype.tick = function () {
        console.log("tick, tick");
    };
    return AnalogClock;
}());
var digital = createClock(DigitalClock, 12, 17);
var analog = createClock(AnalogClock, 2, 42);
var getCounter = function () {
    var counter = function (start) {
    };
    counter.interval = 123;
    counter.reset = function () {
    };
    return counter;
};
var c = getCounter();
console.log(c);
c(10);
c.reset();
c.interval = 5.0;
function identity(arg) {
    console.log(arg.length);
    return arg;
}
console.log(identity(["123", "asdf", "wegwe"]));
/*CLASSES*/
var Greeter = /** @class */ (function () {
    function Greeter(who) {
        this.greeting = who;
    }
    Greeter.prototype.greet = function () {
        return "Hello " + this.greeting;
    };
    return Greeter;
}());
var hi = new Greeter("Oleg");
console.log(hi.greet());
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log("Slithering...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(Animal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        console.log("Galloping...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(Animal));
var sam = new Snake("Sammy the Python");
var tom = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
var Person = /** @class */ (function () {
    function Person(input) {
        this.name = input;
    }
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(inputName, department) {
        var _this = _super.call(this, inputName) || this;
        _this.department = department;
        return _this;
    }
    Employee.prototype.showMeWhoIam = function () {
        return "I am " + this.name + " working in " + this.department;
    };
    return Employee;
}(Person));
var misterX = new Employee("Oleg", "FrontEndDevelopment");
console.log(misterX.showMeWhoIam());
/*console.log(misterX.name);Error:(351, 21) TS2445: Property 'name' is protected and only accessible within class 'Person' and its subclasses.*/
/*let misterY = new Person() Error:(352, 15) TS2674: Constructor of class 'Person' is protected and only accessible within the class declaration.*/
var Octopuss = /** @class */ (function () {
    function Octopuss(name) {
        this.name = name;
        this.numberOfLegs = 8;
        this.name = name;
    }
    return Octopuss;
}());
var mirko = new Octopuss("malinka");
console.log(mirko.name);
console.log(mirko.numberOfLegs);
/*mirko.name = 'iskra'; Error:(367, 7) TS2540: Cannot assign to 'name' because it is a constant or a read-only property.*/
var passcode = "passcode";
var Employee = /** @class */ (function () {
    function Employee() {
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (passcode && passcode === "passcode") {
                this._fullName = newName;
            }
            else {
                console.log("Error: Unauthorized update of employee!");
            }
        },
        enumerable: true,
        configurable: true
    });
    return Employee;
}());
var stanis = new Employee();
stanis.fullName = "Bob Smith";
if (stanis.fullName) {
    console.log(stanis.fullName);
}
/*ABSTRACT CLASSES*/
var HomoSapiens = /** @class */ (function () {
    function HomoSapiens() {
    }
    HomoSapiens.prototype.move = function () {
        console.log("roaming the earth...");
    };
    return HomoSapiens;
}());
/*let f = new HomoSapiens() Error:(404, 9) TS2511: Cannot create an instance of an abstract class.*/
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
    }
    Department.prototype.printName = function () {
        console.log("Department name " + this.name);
    };
    return Department;
}());
var AccountingDepartment = /** @class */ (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment() {
        return _super.call(this, "Accounting and Auditing") || this;
    }
    AccountingDepartment.prototype.printMeeting = function () {
        console.log("We will have a meeting with representetive of " + this.name);
    };
    AccountingDepartment.prototype.generalReports = function () {
        console.log("Just another derived class method");
    };
    return AccountingDepartment;
}(Department));
var department; // ok to create a reference to an abstract type
// department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
// department.generateReports(); // error: method doesn't exist on declared abstract type
/*GENERICS*/
/*function Identity <T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg;
}*/
console.log(Identity([123]));
function Identity(arg) {
    return arg;
}
var myIdentity = identity;
/*locking in what the underlying call signature will use*/
var myIdentity2 = identity;
/*GENERIC CLASS*/
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var foo = new GenericNumber();
foo.zeroValue = 12;
foo.add = function (x, y) {
    return x + y;
};
console.log(foo.add(200, 423));
var bar = new GenericNumber();
bar.zeroValue = "";
bar.add = function (x, y) { return x + y; };
console.log(bar.add("asdf", "weqw"));
function identity3(args, T) {
    console.log(args.length);
    return args;
}
identity3({ 2: [123, 324] });
function getProperty(obj, key) {
    return obj[key];
}
var x = { a: "A", b: 2, c: 3, d: 4 };
console.log(getProperty(x, "a")); // okay)
console.log(getProperty(obj, "e"));
/*CLASS TYPES IN GENERICS*/
var BeeKeeper = /** @class */ (function () {
    function BeeKeeper() {
    }
    return BeeKeeper;
}());
var ZooKeeper = /** @class */ (function () {
    function ZooKeeper() {
    }
    return ZooKeeper;
}());
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Bee = /** @class */ (function (_super) {
    __extends(Bee, _super);
    function Bee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bee;
}(Animal));
var Lion = /** @class */ (function (_super) {
    __extends(Lion, _super);
    function Lion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Lion;
}(Animal));
function createInstance(cntr) {
    return new cntr();
}
var Person2 = /** @class */ (function () {
    function Person2() {
    }
    return Person2;
}());
var v = new Person2();
console.log(v);
var x = function (a) { return 0; };
var y = function (b, s) { return 0; };
y = x; // OK
x = y; // Error
var x = function () { return ({ name: "Alice" }); };
var y = function () { return ({ name: "Alice", location: "Seattle" }); };
x = y; // OK
y = x; // Error, because x() lacks a location property
var Animal = /** @class */ (function () {
    function Animal(name, numFeet) {
    }
    return Animal;
}());
var Size = /** @class */ (function () {
    function Size(numFeet) {
    }
    return Size;
}());
var a;
var s;
a = s; // OK
s = a; // OK
var x;
var y;
x = y; // OK, because y matches structure of x
var x;
var y;
x = y; // Error, because x and y are not compatible
/*ADVANCED TYPES*/
// insertion type
function extend(first, second) {
    var result = {};
    for (var id in first) {
        result[id] = first[id];
    }
    for (var id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}
var Person4 = /** @class */ (function () {
    function Person4(name) {
        this.name = name;
    }
    return Person4;
}());
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function () {
        console.log("asdffe");
    };
    return ConsoleLogger;
}());
var jim = extend(new Person4("Jeam Beam"), new ConsoleLogger());
var n = jim.name;
jim.log();
console.log(n);
function getSmallPet() {
    // ...
}
var pet = getSmallPet();
pet.layEggs(); // okay
pet.swim(); // errors
pet.fly();
/*TYPE PREDICATE*/
function isFish(pet) {
    return pet.swim !== undefined;
}
if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
/*MEINE LIEBLING*/
var tasks;
tasks = [
    { id: 1, parent: null, value: "Make breakfast" },
    { id: 2, parent: 1, value: "Brew coffee" },
    { id: 3, parent: 2, value: "Boil water" },
    { id: 4, parent: 1, value: "Grind coffee beans" },
    { id: 5, parent: 3, value: "Pour water over coffee grounds" },
    { id: 6, parent: 3, value: "Brain Drain" },
];
var toHash = function (data) {
    var hash = {};
    data.forEach(function (x) {
        hash[x.id] = x;
    });
    return hash;
};
var toTree = function (data) {
    var tree = {};
    var helper = toHash(data);
    data.reduce(function (a, node) {
        var current = helper[node.id];
        if (!node.parent) { // root node, only one
            tree = node;
        }
        else {
            var x_1 = helper[node.parent];
            if (!x_1.hasOwnProperty("children")) {
                x_1.children = [];
            }
            x_1.children.push(current);
        }
    }, tree);
    return tree;
};
var b = toTree(tasks);
