# Elm Course Notes
___

## Functions
* Functions in elm are not run in the context of object and don't have this or self.
<br> Meaning you can't run a function inside an object and modify the object by referencing its this value
(AKA changing it's state).
* Functions in elm run arguments in a way that each argument is run in it's own function and then is returned with another function that holds the returned value ready to be run with the next argument.
* Arguments are specified with a whitespace (single) separated list of arguments.
* Functions in elm only run with the amount of arguments assigned no more no less
