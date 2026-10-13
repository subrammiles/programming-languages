

for(var a=1;a<5;a++){
   var t=40;
}
for(let b=1;b<5;b++){
    console.log(a); //prints 1
    console.log(t); //prints 40
}
console.log(a);
console.log(b);/*Gives an error because let has block scope and 
this line is not aware of the b*/

/*
Note:const is not shown as we can not change its value,
it cannot be used in loop */
