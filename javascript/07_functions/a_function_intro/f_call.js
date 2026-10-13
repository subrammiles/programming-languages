
/*We can call a function using call */
function test(){
    console.log("Hi")
}
test.call()


var obj={
    name:"Subbu",
    greet:function(){
        console.log(`Hello ${this.name}`)
    }
}
obj.greet();
/*Call method overides the "name" with the passed arguments */
obj.greet.call({name:"Gabbu"});

