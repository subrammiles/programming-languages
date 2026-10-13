//function with return type

function getAge():number{
    return 24;
}
//Function with void return type

function printHello():void{
    console.log("Hello")
}

//Function arguments
function addTwoNumbers(num1:number,num2:number){
  console.log(num1+num2);
}
addTwoNumbers(2,3);

//Optional parameters

function addTwoOr3Numbers(num1:number,num2:number,num3?:number){
    console.log(num1+num2);
  }
  addTwoOr3Numbers(2,3);
  addTwoOr3Numbers(2,3,6);

//Default paramater
function multiPlayWithNumber(num1:number=1,num2:number){
   console.log(num1*num2);
}
multiPlayWithNumber(undefined,2);
multiPlayWithNumber(2,5);

//Nmaed parameter

//Rest parameters

function addFirstNNaturalNumbers(...nmsList:number[]){

}
