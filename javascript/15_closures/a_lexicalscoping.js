

function outer(){
     myname="Subbu";
    // myname is a local variable created by "outer" function
    function inner(){
        console.log(myname)
    }
    inner()
}

outer();
console.log(myname) 
