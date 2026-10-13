
/*Variable assignment takes precedence over
 function declaration */
var double = 22;
function double(num) {
  return (num*2);
}
console.log(typeof double); // Output: number