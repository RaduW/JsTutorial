/*--
##  javascript objects and functions
*/

/*--+

* used to implement pretty much everything including:
    * objects
        * objects
        * classes 
        * namespaces
    * functions
        * functions
        * object members
        * constructors
        * closures
*/

/*--
##  Objects

### Creation    
   
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
/*--+

### Objects are dictionaries (associative arrays) 
mostly used with `string` indexes
```js
x['a'] = 1;
x.b = 23;
x.c = function(){ return 22;}
```
but...

*/
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
including symbols
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
##  Objects

*/

/*--
## Functions

*/


/*--
## Object Oriented JS
*/

/*--
## Prototype

*/

/*--
## Object type

* typeof
* instanceof

*/

/*--
## Object type 
### typeof

```js
typeof(0);
typeof(Nan);
typeof({});
typeof([]);
typeof("abc");
typeof(/abc/);
typeof(function(){return 1;});
```

*/

/*--+
*/
typeof(0);
/*--+
*/
typeof(Nan);
/*--+
*/
typeof({});
/*--+
*/
typeof([]);
/*--+
*/
typeof("abc");
/*--+
*/
typeof(/abc/);
/*--+
*/
typeof(function(){return 1;});
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

