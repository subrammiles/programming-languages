
/*In side function "this" represennts the global object*/

function test(){
   console.log(this) //global
   console.log(this===global) //true
}

//Outside teh function his repressents the module
console.log(this===global) //false
test()