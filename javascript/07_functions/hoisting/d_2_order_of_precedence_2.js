
/*Variable assignment takes precedence over
 function declaration */
 function double(num) {
    return (num*2);
  }
 var double = 22;
 console.log(typeof double); // Output: number