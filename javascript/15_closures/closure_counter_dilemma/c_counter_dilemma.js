


/*We can remove the global counter and access
 the local counter by letting the function 
 return it */

function add(){
  let counter=0 
  counter=counter+1;
  return  counter
}

add();
add();
add();
/*reset the local counter every
 time we call the function. */
 
