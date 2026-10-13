
/* Suppose we want to store the third party data in an array 
but we don’t know the exact data type of array so we 
initialize the array of any */


let unKnowDataTypeAray : any[]=[1,"data1"];
unKnowDataTypeAray.push("data2");
unKnowDataTypeAray.push(2)
unKnowDataTypeAray.push("data3");
unKnowDataTypeAray.push(3)
console.log(unKnowDataTypeAray)

/*If you see we push an integer and string into the array safely
*/

/*Instead of "any" if you give number ,string type ,it won't work as expected */
//let unKnowDataTypeAray2 : number[]=[1,"data1"];

/*Type 'string' is not assignable to type 'number'. */