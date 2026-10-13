

if(Math.random()>0.5){
   var x=1;
}else{
    var x=2;
}

console.log(x)
/*
For people from other languages (e.g. C, Java) where blocks 
create scopes, the above code should 
throw an 
error on the console.log line, 
because we are outside the scope of x 
in either block. However, because 
blocks don't create scopes for var, 
the var statements here actually create a
 global variable. 
*/

//We can use const for block specfic

if(Math.random()>0.5){
    const y=1;
 }else{
     const y=2;
 }
 
 //console.log(y)//GIves y is not defined error

 if(Math.random()>0.5){
    let z=1;
 }else{
     let z=2;
 }
 console.log(z)//Gives z is not defined error

