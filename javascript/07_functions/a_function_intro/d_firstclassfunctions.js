
/*
A programming language is said to have First-class functions when functions in that 
language are treated like any other variable. 
*/

function test1(){
    console.log("<<<<<<<Test1>>>>>>>>");
    /*We are passing function to a function */
    printToScreen(greet)
}

function printToScreen(myfunc){
    /*This method accepts the function as argument */
    myfunc();
    /*We called the function */
}

function greet(){
    console.log("Hello World")
}


function test2(){
    console.log("<<<<<<<Test2>>>>>>>>");
    // We are creating a function and assigning it to a varible
    var myFunc=function(){
        console.log("I am testing function assigned to varibles")
    }
    myFunc();
}

function test3(){
    console.log("<<<<<<<Test3>>>>>>>>");
    functionExpressionFly(function(){
        console.log("This is function expression on fly")
      });
    /*functionExpressionFly accepts a function and we created on fly */
    
}
function functionExpressionFly(myfunc){
    myfunc();
}

test1()
test2()
test3()