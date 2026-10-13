/*We are importing file 1 and file 2 */

/*Let call the methods from file 1 and file 2 */

console.log("File 2 output:")
var greet2=require('./file2.js')
greet2()

console.log("File 1 output:")
var greet1=require('./file1.js')
greet1()
/*greet1() throws an error because greet1() is not exported in file1 */


