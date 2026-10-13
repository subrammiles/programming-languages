/*
The global object exposes a variety of useful
 properties about the environment. 
Also this is the place where functions as 
setImmediate and clearTimeout are located.
*/

global.console.log(" console log Test")
global.setTimeout(()=>{console.log("Test")},5000)

global.setInterval(()=>{console.log("Test")},5000)
