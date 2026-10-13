
/*Function declarations take precedence over variable declarations */
function double(num) {
    return (num*2);
  }
var double;
console.log(typeof double); // Output: function