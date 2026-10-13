

require("./file1.js");
require("./file1.js");


/*Expected output: 
Hello I am from file 1
Hello I am from file 1
*/

/*Actual output: 
Hello I am from file 1
*/

/*The output "Hello I am from file 1" prints only 1 time
because ,file imported is cached.2nd time file is loaded from the cache
*/