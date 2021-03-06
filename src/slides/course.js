/*--
##  Javascript Fundamentals

1. Objects
    1. what are javascript objects
    2. object creation
    3. object type (first approximation)
2. Functions
    1. what are javascript functions
    2. functions as specialized objects
    2. creating functions in javascript
    3. functions are first-class language constructs 
    4. theory (scope,environment,closures)
    5. working with closures
3. Object Oriented Concepts in JS
    1. object type (second approximation)
    1. this
*/


/*--

## 1.1 Objects are dictionaries (associative arrays) 
mostly used with `string` indexes
```js
x['a'] = 1;
x.b = 23;
x.c = function(){ return 22;}
```
but...

*/
x = {}
x['a'] = 1;
x.b = 23;
x.c = function(){ return 22;}

/*--+

### ~~indexes can be anything (including other objects)~~
~~When non string indexes are used only the [] notation can be used~~

**When using objects as indexes they will be converted to strings and the resulting string
will become the index !!!**

**This is problematic DON'T do it.** 
  
In ECMAScript 2015 (JS6) there is the object Map that can be used with any type of index.

*** Wrong Example Below !!!! ***
```js
var x = {};
var y = {};
function f(){return 1;}
x[y]= function(){return 123;}
x[1] = function(){return 222;}
x[f] = 111;
x[y]()+x[1]()+x[f];
```
*/
var x = {};
var y = {};
function f(){return 1;}
x[y]= function(){return 123;}
x[1] = function(){return 222;}
x[f] = 111;
x[y]()+x[1]()+x[f];

/*--+
Symbols

Symbol work as indexes, they are **NOT** converted to strings

```js
var x = {};
var y = Symbol('something');
x[y]= function(){return 123;}
x[y]();
```
*/
var x = {};
var y = Symbol('something');
x[y]= function(){return 123;}
x[y]();


/*--
##  1.2 Object Creation    
   
```js
var x = new Object(); // probably not
var y = {};
//y is the prototype (more on this latter)
var w = Object.create( y, propDescriptor); 
[x,y,w];
```
*/
var x = new Object(); // probably not
var y = {}; 
var w = Object.create(y);
[x,y,w];

/*--
## Object type (first approximation)

typeof

```js
typeof(0);
typeof(NaN);
typeof(undefined);
typeof(null);
typeof({});
typeof([]);
typeof("abc");
typeof(/abc/);
typeof(function(){return 1;});
typeof(Symbol('abc'));
```
*/

[typeof(0),
typeof(NaN),
typeof(undefined),
typeof(null),
typeof({}),
typeof([]),
typeof("abc"),
typeof(/abc/),
typeof(function(){return 1;}),
typeof(Symbol('abc'))]


/*--

## 2. Functions

* the only Js language abstraction for code
*/

/*--+
* they (can) behave like normal objects (i.e. can/are be used as dictionaries)
```js
function f(){
    return 1;
}
f.a = 111;
f.b = function(){return 123;}
f['c'] = 222;
```

*/
function f(){
    return 1;
}
f.a = 111;
f.b = function(){return 123;}
f['c'] = 222;
f.a + f.b() + f.c;

/*--
## 2.3 Creating functions in JS

* function declaration `function myFunc() { return 123;}`
* function expression `var myFunc = function(){ return 123;}`
* function constructor `var myFunc = new Function('return 123;');`
* (Js2015) arrow function expression `var myFunc = () => { return 123;}`
*/

/*--+

* function declaration are hoisted (they can be used before the body)

```js
myFunc(); //OK

function myFunc(){ return 1;}
```

* variables are hoisted but initialization still remains where it is done

```js
myFuncExpression(); // ERROR myFuncExperession is not a function

var myFuncExpression = function() {return 123;}

myFuncExperession(); // OK the myFuncExpression variable has been initialized
```

*/


/*--
    
## 2.3 Functions are first-class language constructs. 

### Functions can be manipulated as normal data:

* can be created at runtime
* can be stored in variables
* can be passed as parameters to functions
* can be returned from functions

```js
var f = function(){return 1;}
var g = function(inner){ return inner();};
var h = function()
{
    return function(){
        return 3;
    };
};

f();    //1
g(f);   //1
h()();  //3
g(h()); //3
g(h)(); //3

```

    
*/
var f = function(){return 1;}
var g = function(inner){ return inner();};
var h = function()
{
    return function(){
        return 3;
    };
};
[f(),g(f),h()(),g(h()), g(h)()];

/*--
## Theory ( scope, environment, closure)

#### free variable
* A variable used in a function that is neither a function parameter nor a local variable
#### bound variable
* either a local variable or a parameter

```js
var a = 1;
var b = 1;
function f(a,m){
    var n = a+b+m;
    return n;
}
```
 
*/

/*--
## dynamic versus static (lexical) scope

* An example
* What does `higher(foo)` return ?

```js
var x = 10;
 
function foo() {
  return x;
}
 
function higher(funArg) {
  var x = 20;
  return funArg();
};

higher(foo);

```
*/

/*--+

Javascript (like most modern languages) uses static (lexical) scoping.

Free variable are resolved based **exclusively** based on where they are defined.

Unlike dynamic scoping one can tell precisely to what is a symbol bound just
by looking at the source where the variable is used (it doesn't depend on where
the function is called).

*/

var x = 10;
 
function foo() {
  return x;
}
 
function higher(funArg) {
  var x = 20;
  return funArg();
};

higher(foo);

/*--

## static scoping + first-class functions 

* we need a mechanism to hold onto the free variables of a function

```js
function outer( x){
    return function inner(y){
        return x+y;
    }
}

var f = outer(1);
f(2);
```
*/
function outer( x){
    return function inner(y){
        return x+y;
    }
}

var f = outer(1);
f(2);

/*--

## Closure (definition)

##### Wikipedia

>In programming languages, closures (also lexical closures or function closures) are a technique for implementing lexically scoped name binding in languages
>with first-class functions. Operationally, a closure is a record storing a function together with an environment: a mapping associating 
>each free variable of the function (variables that are used locally, but defined in an enclosing scope) with the value or storage location to 
>which the name was bound when the closure was created. A closure—unlike a plain function—allows the function to access those captured variables through 
>the closure's reference to them, even when the function is invoked outside their scope.
*/
function outer( x){
    return function inner(y){
        return x+y;
    }
}

var f = outer(1);
f(2);

/*--+

* closures appear wierd because we automatically think about stacks when we talk about function calls
* closures are **NOT** implemented using the stack model.

##### Javascript (JS 5) uses the concept of **Lexical Environment**

>A lexical environment defines the association of identifiers to the values of variables and functions based upon the lexical nesting structures of ECMAScript code.

*/

/*--

### An example

```js
// Global environment (GE)
var x = 10;
 
function foo(y) {
  // environment of "foo" function (E1)
  var z = 30;
 
  function bar(q) {
    // environment of "bar" function (E2)
    return x + y + z + q;
  }
 
  // return "bar" to the outside
  return bar;
}
 
var bar = foo(20);
bar(40); // 100
```

![environment](slides/environment.png)
*/

// Global environment (GE)
var x = 10;
 
function foo(y) {
  // environment of "foo" function (E1)
  var z = 30;
 
  function bar(q) {
    // environment of "bar" function (E2)
    return x + y + z + q;
  }
 
  // return "bar" to the outside
  return bar;
}
 
var bar = foo(20);
bar(40); // 100

/*--
## JavaScript Functions

* objects that can be executed i.e. support `operator()`
* are dictionaries like any other object
* receive a hidden object on creation containing the free variables (the environmet)
    * the environment of a function persists as long as the function persists
    * the environment of a function can be accessed/modified from the function and from all inner functions

```js
var a = 0;
function outer(){
    var b = 0;
    function middle(){
        function inner(){
            b++;
            return a+b;
        }
        return inner
    }
    return middle;
}
var m1 =outer();
var m2 =outer();
var i1 =m1();
var i2 =m1();
var i3 =m2();
var i4 =m2();
[i1(),i2(),i3(),i4()];
```
*/

var a = 0;
function outer(){
    var b = 0;
    function middle(){
        function inner(){
            b++;
            return a+b;
        }
        return inner
    }
    return middle;
}
var m1 =outer();
var m2 =outer();
var i1 =m1();
var i2 =m1();
var i3 =m2();
var i4 =m2();
[i1(),i2(),i3(),i4()];

/*--+

##### Pseudocode

```js
outer = { call : function outer(){...}
    environment: { a: 0 }
    parentEnv: null
}
m1 = { call : function middle(){...}
    environment: { b:0}
    parentEnv: outer.environment
}
m2 = { call : function middle(){...}
    environment: { b:0 }
    parentEnv: outer.environment
}
i1 = { call : function inner(){...}
    environment: {}
    parentEnv: m1.environment
}
i2 = { call : function inner(){...}
    environment: {}
    parentEnv: m1.environment
}
i3 = { call : function inner(){...}
    environment: {}
    parentEnv: m2.environment
}
i4 = { call : function inner(){...}
    environment: {}
    parentEnv: m2.environment
}
```
*/

/*--
```js
var a = 0;
function outer(){
    var b = 0;
    function middle(){
        function inner(){
            b++;
            return a+b;
        }
        return inner
    }
    return middle;
}
var m1=outer(), m2=outer()
    i1=m1(), i2=m1(), i3=m2(), i4=m2();
[i1(),i2(),i3(),i4()];

//Pseudocode
outer = { environment: { a:0 }, parentEnv: null}
m1 = { environment: { b:0 }, parentEnv: outer.environment}
m2 = { environment: { b:0 }, parentEnv: outer.environment}
i1 = { environment: {}, parentEnv: m1.environment}
i2 = { environment: {}, parentEnv: m1.environment}
i3 = { environment: {}, parentEnv: m2.environment}
i4 = { environment: {}, parentEnv: m2.environment}

```
*/

/*--
## scope sharing *or not*

* What does this return ?

```js
var data = [];
 
for (var k = 0; k < 3; k++) {
  data[k] = function () {
    return k;
  };
}
 
[data[0](),data[1](),data[2]()];
```
*/
var data = [];
 
for (var k = 0; k < 3; k++) {
  data[k] = function () {
    return k;
  };
}
 
[data[0](),data[1](),data[2]()];

/*--+
* How can we fix it ? 
*/


/*--+
### ... each function needs a private k in a separate environment

```js
var data = [];

for (var k = 0; k < 3; k++) {
    function middle(){
        var x = k;
        return function () {
            return x;
        }
    }
    data[k] = middle();
}

[data[0](),data[1](),data[2]()];

// or shorter...

for (var k = 0; k < 3; k++) {
    (function(x){
        data[x] = function () {
            return x;
        }
    })(k);
} 
  
[data[0](),data[1](),data[2]()];
```
*/
var data = [];
 
for (var k = 0; k < 3; k++) {
    (function(k){
        data[k] = function () {
            return k;
        }
    })(k);
}
 
[data[0](),data[1](),data[2]()];



/*--
## Object Oriented JS
*/

/*--+
### Types revisited

* `typeof()` --> very course clasification of objects
* `instanceOf` --> closer (somewhat) to the idea of type from C# or other statically typed languages

#### What are types used for in statically typed languages ?

*/

/*--+

1. (**Interface usage**) To infer if a particular function can be used with a particular object ('match' functions with 'compatible' data).
2. (**Type derivation usage**) Code reuse (used to be a big deal in the 199x , not so much anymore).

*/

/*--+

#### Types in Javascript

* In Js we do NOT need any types in order to "match" functions with the data they can operate on (although sometimes it would be nice)
* All Js functions are generic (a lot more generic than generic C# functions, as generic as C++ templates)
* Types in javascript are mainly used for code reuse 
* The type mechanisms (prototypes) are also used for efficiency (to make objects lighter)

*/


/*--
## Prototype

* All Js objects have a link to a **class object** called **Prototype**
* The Prototype object is used to hold common (shared) members
* The Prototype object is set at object construction
* The Prototype object can be accessed via the object or via the constructor function
    * Via object
        * `Object.getPrototypeOf(x)` --> the protable standard way in EcmaScript 5
        * `x.__proto__` --> legacy style (pre EcmaScript 5) non stadard but widely supported
    * via constructor `f.prototype`
 
```js
function f(){return 1;}
var x = new f();

f.prototype == Object.getPrototypeOf(x)  ; // true
f.prototype == x.__proto__; // true
```  
*/
function f(){return 1;}
var x = new f();

[f.prototype == Object.getPrototypeOf(x) ,
f.prototype == x.__proto__] 

/*--
### How does the prototype work ?

When the interpreter tries to access a member it will check if the member is present in the object and if it is not
it will look for it the object prototype.

### typical prototype usage

* used to share object methods

```js
function A(){
    this.x = 1;
    this.y = 2;
}

A.prototype.f = function(){
    return this.x + this.y;
}

a = new A();
a.f(); // 3

```
*/
function A(){
    this.x = 1;
    this.y = 2;
}

A.prototype.f = function(){
    return this.x + this.y;
}

var a = new A();
a.f();

/*--+

* if the member is found in the object the prototype is not checked anymore

```js
var b = new A();
b.f = function() { return this.x - this.y;} 
b.f(); // -1

```

*/
function A(){
    this.x = 1;
    this.y = 2;
}

A.prototype.f = function(){
    return this.x + this.y;
}
var b = new A();
b.f = function() { return this.x - this.y;} 
b.f(); // -1
/*--
### Reading/Writing from prototypes

* reading (rValues) uses the prototype hierachy
* writing (lValues) does **NOT** use the prototype hierachy

```js
function F(){}
F.prototype.a = 1;

var x = new F();
var old = x.a;
x.a = 2;

[old,x.a,F.prototype.a];
delete x.a;
x.a;
```
*/

function F(){}
F.prototype.a = 1;

var x = new F();
var old = x.a;
out ("old x",x)
x.a = 2;
out ("new x", x);
out("old=" + old +" x.a=" + x.a + " F.prototype.a=" + F.prototype.a);

delete x.a;

out("after deleting x.a we get x.a=" + x.a);

/*--+

### sharing common data

* if writing does **NOT** use the prototype how can we share read/write data ?

*/

/*--+
#### Method 1 keep data in the constructor object

* this is how `static` is implemented in Typescript

```js
function F(){
    this.counter = F.counter++;
}

F.prototype.print = function() { out("I am object number:" + this.counter);}
F.counter = 0;

var a1 = new F(), a2 = new F(), a3 = new F();
a1.print();
a2.print();
a3.print();
out ( "We have constructed " + F.counter + " objects"); 
```
*/
function F(){
    this.counter = F.counter++;
}

F.prototype.print = function() { out("I am object number:" + this.counter);}
F.counter = 0;

var a1 = new F(), a2 = new F(), a3 = new F();
a1.print();
a2.print();
a3.print();
out ( "We have constructed " + F.counter + " objects"); 

/*--+
#### Method 2 keep an object in the prototype and modify its members

* this is the idea used in Angular '**controllerAs**' technique.

```js
function F(){
    this.counter = this.viewModel.counter++;
}

F.prototype.print = function() { out("I am object number:" + this.counter);}
F.prototype.viewModel = { counter: 0};

var a1 = new F(), a2 = new F(), a3 = new F();
a1.print();
a2.print();
a3.print();
out ( "We have constructed " + F.prototype.viewModel.counter + " objects"); 
```

*/

function F(){
    this.counter = this.viewModel.counter++;
}

F.prototype.print = function() { out("I am object number:" + this.counter);}
F.prototype.viewModel = { counter: 0};

var a1 = new F(), a2 = new F(), a3 = new F();
a1.print();
a2.print();
a3.print();
out ( "We have constructed " + F.prototype.viewModel.counter + " objects"); 


/*--
### Prototype Inheritance

* A prototype (like any other object) may have itself a prototype (creating a prototype chain).
* When a member lookup is performed the interpreter goes up the prototype chain.

```js
function Animal( name){
    this.name = name;
}

Animal.prototype.sleep = function(){
    out( "" + this.name + " is sleeping." );
}

function Dog( name){
    this.name = name;
}

//Note: not perfect (we should patch the constructor)
Dog.prototype = Object.create(Animal.prototype);
//or non stadard
//Dog.prototype.__proto__ = Animal.prototype;

Dog.prototype.bark = function(){
    out( "" + this.name + " is barking." );
}

var azor = new Dog('Azor');
azor.sleep();
azor.bark();
```
*/
function Animal( name){
    this.name = name;
}

Animal.prototype.sleep = function(){
    out( "" + this.name + " is sleeping." );
}

function Dog( name){
    this.name = name;
}
Dog.prototype = Object.create(Animal.prototype);

Dog.prototype.bark = function(){
    out( "" + this.name + " is barking." );
}

var azor = new Dog('Azor');
azor.bark();
azor.sleep();

/*--

### Constructor property

* When first created a prototype object has a `constructor` property that points back to the function.

```js
var A = function(){};
A.prototype.constructor === A; // true

``` 
*/
function A(){}
A.prototype.constructor === A;

/*--+

* The constructor property is not really used for anything (as far as I know)
* ... but we should try to keep it pointing to the right function anyway

```js
function Animal( name){
    this.name = name;
}

Animal.prototype.sleep = function(){
    out( "" + this.name + " is sleeping." );
}

function Dog( name){
    this.name = name;
}

Dog.prototype = Object.create(Animal.prototype);
//patch the prototype contsturctor to point back to the Dog function
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function(){
    out( "" + this.name + " is barking." );
}

```

*/
/*--

### `instanceof` operator


```js
function A(){ this.a = 1;}
function B(){ this.b = 1;}
A.prototype.fa = function(){ return "fa"};
B.prototype.fb = function(){ return "fb"};
var a = new A();
var b = new B();
a instanceof A; // true
b instanceof B; // true
a instanceof B; // false
A.prototype = B.prototype;
a instanceof B; // false
a instanceof A; // false
out(a,b);
```

*/
function A(){ this.a = 1;}
function B(){ this.b = 1;}
A.prototype.fa = function(){ return "fa"};
B.prototype.fb = function(){ return "fb"};
var a = new A();
var b = new B();
a instanceof A;

/*--+
*/
A.prototype = B.prototype;
out(a,a.fa());
a instanceof A;

/*--+

### `isPrototypeOf()` function

* checks if an object is in the prototype chain of another object 

```js
function f () { return 1;}
var x = new f();
var y = Object.create(x);
f.prototype.isPrototypeOf(y); // true
f.prototype.isPrototypeOf(x); // true
x.isPrototypeOf(y);  // true
```
*/


function f () { return 1;}
var x = new f();
undefined
var y = Object.create(x);
[f.prototype.isPrototypeOf(y),
f.prototype.isPrototypeOf(x),
x.isPrototypeOf(y)];

/*--
## this

* in global context (outside of any function) `this===window`

*/

this === window;

/*--+

* two types of functions
    * bound functions - functions returned by a call to Function.bind()
    * unbound functions - all other functions, methods etc
*/

/*--+

### Bound functions

* have `this` fixed when the function is bound
* once `this` is bound it cannot be changed

```js
var x = { val: "this is x"};

function A(){
    this.member1 = function(){ out("member1",this);}
    this.member1 = this.member1.bind(x);
}

A.prototype.member2 = function(){ out("member2",this);}
A.prototype.member2 = A.prototype.member2.bind(x);

var f = function() { out("f", this);}
f = f.bind(x);

a = new A();
a.member1();
a.member2();
f();

var y = { val: "this is y"};
f = f.bind(y);
f();
```

*/

var x = { val: "this is x"};

function A(){
    this.member1 = function(){ out("member1",this);}
    this.member1 = this.member1.bind(x);
}

A.prototype.member2 = function(){ out("member2",this);}
A.prototype.member2 = A.prototype.member2.bind(x);

var f = function() { out("f", this);}
f = f.bind(x);

a = new A();
a.member1();
a.member2();
f();

var y = { val: "this is y"};
f = f.bind(y);
f();

/*--

## this

* two types of functions
    * bound functions - functions returned by a call to Function.bind()
    * unbound functions - all other functions, methods etc
*/

/*--+

### Unbound functions

* all functions that were not bound by a call to Function.bind() are unbound
* all unbound functions take their `this` **at call time**.
* if no `this` is passed at call time then:
    * in strict mode `this === undefined`
    * in non strict mode 'this ==== window` 

*/

function f(){
    this.a = 'a set in f';
}

f();
a;

/*--+
*/

function g(){
    'use strict';
    this.a = 'a set in g';
}

/*--+

#### How is `this` set

* when using the `new F();` syntax
 
a new empty object is created and passed as `this`;
*/

function F(){
    'use strict';
    this.a = 'a set in F';
}

var x = new F();
x.a;

/*--+

* when using the 'member' syntax `x.f()` `this` is the id left of the '.'

*/

function F(){}

F.prototype.member = function(){
    'use strict';
    this.a = 'a set in member';
}

var x = new F();
x.member();
x.a;

/*--+

* this passed explicitly to `call()` or `apply()`

*/

function F(){}

function someFunc(){
    'use strict';
    this.a = 'a set in someFunc';
}

var x = new F();
var y = new F();

f.apply(x);
f.call(y);

[x.a, y.a];

/*--+

* this passed explicitly to library functions or js functions like forEach ( same thing as `call()` or `apply()` )

*/

function F(){
    this.counter = 0;
}

function someFunc(val){
    'use strict';
    this.counter += val;
}

var x = new F();

var someArray = [1,2,3];
someArray.forEach(someFunc,x);

x.counter;

/*--+

* JS6 (Javascript 2015) using  => functions

* arrow functions close on the `this` at creation time


```js
function F(){
    'use strict';
    this.f = () => { this.a ='set in f()';};
}
```

equivalent in JS5 with :

```js
function F(){
    'use strict';
    var closedThis = this;
    this.f = function(){ closedThis.a ='set in f()';};
}
```
*/

function F(){
    'use strict';
    var closedThis = this;
    this.f = function(){ closedThis.a ='set in f()';};
}

var x = new F();
var ff = x.f;

ff();

x.a;

/*--

### **NOT** using `this`

* You don't have to use `this` for accessing object members, you can 'cheat' and use a closed copy of `this` 

This is exactly the way the arrow function example above works. 

Instead of using `this` close the `this` of an external context and use the closed `this`.

This technique is wildly used by many frameworks and guidelines.

The names used for the closed `this` are typically `vm, that, self, _this` 

```js

var SomeFramework = {
    registerCallback:  function(callback) { SomeFramework.callback = callback;},
    doStuff: function() { SomeFramework.callback();}
}

function F(){
    'use strict';
    this.a = "F.a set in constructor"
    var that = this;
    this.f = function(){ out(that.a);};
    SomeFramework.registerCallback(this.f);
}

var x = new F();
SomeFramework.doStuff();
```
*/

var SomeFramework = {
    registerCallback:  function(callback) { SomeFramework.callback = callback;},
    doStuff: function() { SomeFramework.callback();}
}

function F(){
    'use strict';
    this.a = "F.a set in constructor"
    var that = this;
    this.f = function(){ out(that.a);};
    SomeFramework.registerCallback(this.f);
}

var x = new F();
SomeFramework.doStuff();

/*--

### Conclusion

* If a function is unbound and it is not called using one of the methods described above it will have a **BAD** `this` 
  *  `undefined` for strict functions
  * `window` for non strict functions
  
*/