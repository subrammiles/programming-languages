
let x=10;

function test(){
   console.log(this.x) //undefined
   //We are assigning y value to the global
   this.y=20
}

function test2(){
   console.log("Test 2 y value ",this.y)
}


console.log(this.x) //undefined
test()
test2()