var myArray = [123, 15, 187, 32];


myArray.forEach(function (value, i) {
    console.log('%d: %s', i, value);
});

/*Same Function using Arrow notations */
myArray.forEach( (value, i) =>{
    console.log('%d: %s', i, value);
});

/*Another way :Just defining the function outside */
const myCalBackFunction= (value, i) =>{
    console.log('%d: %s', i, value);
}
myArray.forEach(myCalBackFunction);

/*
forEach function defination: 
forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
*/

/*To forEach we are passing one function 
and that function should accepts two parameters and also
you need to implement that function
*/


