# Elm Course Notes

## Functions
* Functions in elm are not run in the context of object and don't have this or self.
<br> Meaning you can't run a function inside an object and modify the object by referencing its this value
(AKA changing it's state).
* Functions in elm run arguments in a way that each argument is run in it's own function and then is returned with another function that holds the returned value ready to be run with the next argument.
* Arguments are specified with a whitespace (single) separated list of arguments.
* Functions in elm only run with the amount of arguments assigned no more no less
* If you want to run the returned value of another function inside a function use parenthesis (or the pipe operator see below). `(...)` parenthesis forces elm to evaluate the function.

### Defining functions:
#### In Elm
``` Elm

--Name Arguments = return value  
foo a b c =
  a + b + c
```
#### Is the same as this in JavaScript  
  ``` JavaScript
  function foo (a,b,c) {
    return a + b + c;
  }
  ```
### Calling functions:
#### In Elm
``` Elm
foo 2 4 8 -- returns 14
```
#### Is the same as this in JavaScript  
``` JavaScript
    foo(2,4,8); // returns 14
```

## Pipe Operator - `|>`
the pipe operator is a way to chain functions together and pass each return value down the function chain.<br>
first comes the argument to be processed through the chain and then the functions in order as such:

``` Elm
"This is a String Value"
  |> String.toUpper -- the string value gets passed as an argument to the toUpper function
-- the specified number 3 is forced to be first argument and the returned value of the last function gets passed as second argument.
  |> String.repeat 3
  |> String.reverse
```

## The Import System In Elm

The import system in elm lets you import core and custom modules into the current namespace.
every file in elm is a module and should start with defining it's name as so `module MyModule where`. br
You can expose the module with the syntax `import ModuleName`.br
This lets you access all the methods in that module using the dot notation like so: `MyModule.someFunction`. Alternatively you can expose certain function of that modules to exist directly on the namespace by adding this to the import line: `import ModuleName exposing (myFunction)`. This will give you access to `myFunction` from anywhere inside the module to which it was exposed.


## Definitions
In Elm Definitions like var/let are done so: `foo = "123"`. just like function definition. in fact you can think of it like a function that always returns the same value.
