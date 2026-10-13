

let x={"myname":"Trump"};
/*Method 1 */
//This garunties keys order
const keys=Object.keys(x);
console.log(keys.length)

/*Method 2 */
//Get  array of the object properties and use length of array
const propOwn = Object.getOwnPropertyNames(x);
console.log(propOwn)
console.log(propOwn.length)

