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

### indexes can be anything (including other objects)
When non string indexes are used only the [] notation can be used
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
and also symbols
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
*/

/*--
## dynamic versus static (lexical) scope

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

![environment](/slides/environment.png)
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
    (function(k){
        data[k] = function () {
            return k;
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
* `instanceOf()` --> closer (somewhat) to the idea of type from C# or other statically typed languages

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
* The type mechanisms (prototypes) are also used for efficiency (to make objects less hevy)

*/


/*--
## Prototype

*/

/*--

*/
function f(){return 1;}
f.prototype.constructor == f
var x = new f();
Object.getPrototypeOf(x) == f.prototype

Object.getPrototypeOf(x) == x.__proto__
/*--
```js
function f () { return 1;}
var x = new f();
undefined
var y = Object.create(x);
f.prototype.isPrototypeOf(y); 
f.prototype.isPrototypeOf(x); 
x.isPrototypeOf(y); 
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

### reading/writing from prototypes

* reading (rValues) use the prototype hierachy
* writing (lValues) do **NOT** use the prototype hierachy

```js
function F(){}
F.prototype.a = 1;

var x = new F();
var y = x.a;
x.a = 2;
[y,x.a,F.prototype.a];
delete x.a;
x.a;
```

*/

function F(){}
F.prototype.a = 1;

var x = new F();
var y = x.a;
x.a = 2;
[y,x.a,F.prototype.a];
