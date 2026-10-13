/*We can  iniitlize  any value to unknow  */

let myUnknowVar10:unknown=1;
let myUnknowVar11:unknown=2;

//You can not directly apply operation on unknow
//It has strict type safety
//console.log(myUnknowVar10+myUnknowVar11);

/*one using the unknown  variable has to do a typecheck first*/
if(typeof myUnknowVar10 ==="number" &&  typeof myUnknowVar11 ==="number"){
    console.log(myUnknowVar10+myUnknowVar11) 
}else{
    console.log("Not able to add these numbers")
}

