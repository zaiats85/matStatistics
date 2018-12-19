class Student {
    fullName: string;

    constructor(public firstName: string, public lastName: string) {
        this.fullName = firstName + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

const greeter = (person: Person) => ("Hello " + person.firstName.toUpperCase() + " " + person.lastName.toUpperCase());

let user = new Student("oleg", "zaiats");

document.body.innerHTML = greeter(user);

/*Basic Types*/
let isDone: boolean = false;
let decimal: number = 5;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

let fullName: string = `Bob Bobbington`;
let age: number = 37;

/*Interpolation*/
let sentence: string = `Hello, my name is ${fullName}. I'll be ${age + 1} years old next month.`;
console.log(sentence);

/*Complex Data Types*/

// Vector. type of elements followed by [];
let list: number[] = [1, 2, 3, 4, 5];
// Vector. Generic Array Type;
let genericList: number[] = [12, 4, 5, 2, 3, 21];

/*TUPLE. Набор. Кортеж.*/
// Declaration
let x: [string, number];
// Initialization
x = ["Cat", 3];
// Incorrect
// x = ["Dog", "wife"]; Error:(46, 13) TS2322: Type 'string' is not assignable to type 'number'.

/*ENUMERABLE. СЧЕТНИЙ. ПЕРЕЧИСЛИСИЙ.*/
enum Gender {MALE, FEMALE, UNKNOWN}

let olegGender: string = Gender[1];

/*ANY*/
/*These values may come from dynamic content, e.g. from the user or a 3rd party library*/
let notSure: any = "whatEver";
notSure = 42;

let unsureList: any[] = [1, true, "free"];
list[1] = 100;

console.log(unsureList);
/*VOID.Not returning value*/

const warnUser = (): void => {
    console.log("This is my warning message");
};
warnUser();

/*Declaring variables of type void is not useful because you can only assign undefined or null to them:*/
let unusable: void;

/*Never*/
/*A function that doesn't explicitly return a value implicitly returns the value undefined in JavaScript.
Although we typically say that such a function "doesn't return anything", it returns. We usually ignore the
return value in these cases. Such a function is inferred to have a void return type in TypeScript.
A function that has a never return type never returns. It doesn't return undefined, either. The function doesn't
have a normal completion, which means it throws an error or never finishes running at all.*/

// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
    }
}

/*VARIABLE DECLARATIONS*/
interface C {
    a: string;
    b?: number;
}

function f({a, b}: C): void {
    // ...
}

/*INTERFACES*/
interface labelledValue {
    label: string;
}

const printLabel = (input: labelledValue) => {
    console.log(input.label);
};

let obj = {size: 32, label: "testing interfaces"};

printLabel(obj);

/*
function (argument: argumentType): returnType {
    return value;
}
const foo = (a: type, b: type): returnType => { return ... };
*/

const foo = (a: number, b: number): string => {
    return (a + b).toString();
};
console.log(foo(23, 4));

interface SquareConfig {
    color?: string;
    height?: number;
}

type squareFunction = (config: SquareConfig) => { color: string, area: number };

const createSquare: squareFunction = (config: SquareConfig): { color: string, area: number } => {
    const newSquare = {color: "white", area: 100};

    if (config.color) {
        newSquare.color = config.color;
    }

    if (config.height) {
        newSquare.area = config.height ** 2;
    }

    return newSquare;
};

let s = createSquare({color: "black", height: 15});
console.log(s);

/*READONLY - set properties when created only*/
interface Point {
    readonly x: number;
    readonly y: number;

    [propName: string]: any;
}

let p1: Point = {x: 32, y: 12};
/*p1.x = 34; Error:(151, 4) TS2540: Cannot assign to 'x' because it is a constant or a read-only property.*/

/*ReadonlyArray<number> ready type with all array mutating methods removed*/
let a: number[] = [1, 2, 3, 4, 5, 7];
let b: ReadonlyArray<number> = [4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7];

a[2] = 321;
console.log(a[2]);

/*b[2] = 34;Error:(160, 1) TS2542: Index signature in type 'ReadonlyArray<number>' only permits reading.*/

/*Indexable types*/

interface indexArray {
    [index: number]: string;
}

// Error:(171, 46) TS2322: Type 'number' is not assignable to type 'string'.
/*let test: indexArray = ['asd', 'asdf', '324', 324];*/
let test2: indexArray = ["asdf", "wer", "qwe"];

interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ["Alice", "Bob"];

// myArray[2] = "Mallory"; // error!

interface ClockInterface1 {
    currentTime: Date;

    setTime(d: Date);
}

class Clock implements ClockInterface1 {
    currentTime: Date;

    constructor(h: number, m: number) {

    }

    setTime(d: Date) {
        this.currentTime = d;
    }
}

/*----------------------------------*/
interface ClockInterface {
    tick();
}

interface clockConstructor {
    new(h: number, m: number): ClockInterface;
}

const createClock = (ctor: clockConstructor, hour: number, minute: number): ClockInterface => {
    return new ctor(hour, minute);
};

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {
    }

    tick() {
        console.log("beep, beep");
    }
}

class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) {
    }

    tick() {
        console.log("tick, tick");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 2, 42);


interface Counter {
    (start: number): string;

    interval: number;

    reset(): void;
}

const getCounter = (): Counter => {
    const counter = function(start: number) {
    } as Counter;
    counter.interval = 123;
    counter.reset = function() {
    };
    return counter;
};

let c = getCounter();
console.log(c);
c(10);
c.reset();
c.interval = 5.0;

function identity<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg;
}

console.log(identity(["123", "asdf", "wegwe"]));

/*CLASSES*/
class Greeter {
    greeting: string;

    constructor(who: string) {
        this.greeting = who;
    }

    greet() {
        return "Hello " + this.greeting;
    }
}

let hi = new Greeter("Oleg");

console.log(hi.greet());

class Animal {
    name: string;

    constructor(theName: string) {
        this.name = theName;
    }

    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name);
    }

    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) {
        super(name);
    }

    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

class Person {
    protected name: string;

    protected constructor(input: string) {
        this.name = input;
    }


}

class Employee extends Person {

    department: string;

    constructor(inputName: string, department: string) {
        super(inputName);
        this.department = department;
    }

    showMeWhoIam() {
        return "I am " + this.name + " working in " + this.department;
    }
}

let misterX = new Employee("Oleg", "FrontEndDevelopment");

console.log(misterX.showMeWhoIam());
/*console.log(misterX.name);Error:(351, 21) TS2445: Property 'name' is protected and only accessible within class 'Person' and its subclasses.*/

/*let misterY = new Person() Error:(352, 15) TS2674: Constructor of class 'Person' is protected and only accessible within the class declaration.*/

class Octopuss {

    readonly numberOfLegs: number = 8;

    constructor(readonly name: string) {
        this.name = name;
    }

}

let mirko = new Octopuss("malinka");
console.log(mirko.name);
console.log(mirko.numberOfLegs);
/*mirko.name = 'iskra'; Error:(367, 7) TS2540: Cannot assign to 'name' because it is a constant or a read-only property.*/

let passcode: string = "passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode === "passcode") {
            this._fullName = newName;
        } else {
            console.log("Error: Unauthorized update of employee!");
        }
    }


}

let stanis = new Employee();
stanis.fullName = "Bob Smith";
if (stanis.fullName) {
    console.log(stanis.fullName);
}

/*ABSTRACT CLASSES*/
abstract class HomoSapiens {
    abstract makeSound(): void;

    move(): void {
        console.log("roaming the earth...");
    }
}

/*let f = new HomoSapiens() Error:(404, 9) TS2511: Cannot create an instance of an abstract class.*/
abstract class Department {
    constructor(public name: string) {
    }

    printName(): void {
        console.log("Department name " + this.name);
    }

    abstract printMeeting(): void; // must be implemented;
}

class AccountingDepartment extends Department {
    constructor() {
        super("Accounting and Auditing");
    }

    public printMeeting(): void {
        console.log("We will have a meeting with representetive of " + this.name);
    }

    public generalReports(): void {
        console.log("Just another derived class method");
    }
}

let department: Department; // ok to create a reference to an abstract type
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

type GenericIdentityInterface = <T>(T) => T;

type GenericIdentityInterface2<T> = (T) => T;

function Identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityInterface = identity;
/*locking in what the underlying call signature will use*/
let myIdentity2: GenericIdentityInterface2<number> = identity;

/*GENERIC CLASS*/
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let foo = new GenericNumber<number>();
foo.zeroValue = 12;
foo.add = function(x, y) {
    return x + y;
};

console.log(foo.add(200, 423));

let bar = new GenericNumber<string>();
bar.zeroValue = "";
bar.add = (x, y) => x + y;

console.log(bar.add("asdf", "weqw"));

/*CONSTRAINTS*/
interface Lengthwise {
    length: number;
}

function identity3<T extends Lengthwise>(args, T): T {
    console.log(args.length);
    return args;
}

identity3({2: [123, 324]});

function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = {a: "A", b: 2, c: 3, d: 4};

console.log(getProperty(x, "a"); // okay)
console.log(getProperty(obj, "e"));

/*CLASS TYPES IN GENERICS*/
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(cntr: new () => A): A {
    return new cntr();
}

/*let bg = createInstance(Lion).keeper.nametag;  // typechecks!*/
/*let mg = createInstance(Bee).keeper.hasMask;   // typechecks!*/

/*TYPE COMPATIBILITY*/
interface Named {
    name: string;
}

class Person2 {
    name: string;
}

let v: Named = new Person2();
console.log(v);

let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error

let x = () => ({name: "Alice"});
let y = () => ({name: "Alice", location: "Seattle"});

x = y; // OK
y = x; // Error, because x() lacks a location property

class Animal {
    feet: number;

    constructor(name: string, numFeet: number) {
    }
}

class Size {
    feet: number;

    constructor(numFeet: number) {
    }
}

let a: Animal;
let s: Size;

a = s;  // OK
s = a;  // OK

interface Empty<T> {
}

let x: Empty<number>;
let y: Empty<string>;

x = y;  // OK, because y matches structure of x

interface NotEmpty<T> {
    data: T;
}

let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y;  // Error, because x and y are not compatible

/*ADVANCED TYPES*/

// insertion type
function extend<T, U>(first: T, second: U): T & U {
    const result = {} as  T & U;
    for (const id in first) {
        (result as any)[id] = (first as any)[id];
    }
    for (const id in second) {
        if (!result.hasOwnProperty(id)) {
            (result as any)[id] = (second as any)[id];
        }
    }
    return result;
}

class Person4 {
    constructor(public name: string) {

    }
}

interface Loggable {
    log(): void;
}

class ConsoleLogger implements Loggable {
    log() {
        console.log("asdffe");
    }
}

let jim = extend(new Person4("Jeam Beam"), new ConsoleLogger());
let n = jim.name;
jim.log();
console.log(n);

/*UNION TYPE*/
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors
pet.fly();

/*TYPE PREDICATE*/
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

if (isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}

/*MEINE LIEBLING*/


let tasks: Array<{ id: number, parent: number | null, value: string}>;
tasks = [
    { id: 1, parent: null, value: "Make breakfast" },
    { id: 2, parent: 1, value: "Brew coffee" },
    { id: 3, parent: 2, value: "Boil water" },
    { id: 4, parent: 1, value: "Grind coffee beans" },
    { id: 5, parent: 3, value: "Pour water over coffee grounds" },
    { id: 6, parent: 3, value: "Brain Drain" },
];




const toHash = (data) => {
    const hash = {};
    data.forEach((x) => {
        hash[x.id] = x;
    });

    return hash;

};

const toTree = (data) => {

    let tree = {};
    const helper = toHash(data);

    data.reduce((a, node) => {

        const current = helper[node.id];

        if (!node.parent) { // root node, only one
            tree = node;
        } else {
            const x = helper[node.parent];
            if (!x.hasOwnProperty("children")) {
                x.children = [];
            }
            x.children.push(current);
        }
    }, tree);

    return tree;

};

let b = toTree(tasks);
