var greet2=function(){
    console.log("Hello I am from the  file 2")
}

module.exports=greet2;


/*
1.The "module.exports" syntax allows you to export a single value 
from a module as the default export. 
2.When another module imports the module that uses export default, 
the imported value will be whatever value was exported as the default. 
3.You can only have one default export per module.
*/