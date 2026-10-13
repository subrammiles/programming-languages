
let counter=0;

function add(){
  let counter=0 
  /*no code can change this value outside the function*/
  counter=counter+1;
}

add();
add();
add();
console.log(counter)
/*The counter should now be 3. But it is 0.
It did not work because we display the 
global counter 
instead of the local counter.
*/