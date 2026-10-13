/*In most of programming languages, inhertence is onc class access the properties of another class */
  /*As everthing is object in JS,Object has inhertience*/

  var a={
    "num1":2,
    "num2":4,
    "op":{
        "add":function(num1,num2){
             console.log(num1+num2)
        },
        "mul":function(num1,num2){
          console.log(num1*num2)
     }
    }
}
/*We can access object elememts with "." */
console.log(a.op.mul(a.num1,a.num2))

