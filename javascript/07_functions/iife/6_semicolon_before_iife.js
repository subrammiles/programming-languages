/*
One thing to be careful with is variables that 
are not closed off or that JavaScript deems to 
not have been closed off. You may run into 
errors if you omit semicolons, especially in 
applications using IIFEs.  */

//This thows an error because there is no semicolon for the 
// msg at the end
const msg="Hello Subbu"
(
    function great(){
        console.log(msg)
    }
)()


/*
//This works fine
const msg="Hello Subbu";
(
    function great(){
        console.log(msg)
    }
)()
*/
