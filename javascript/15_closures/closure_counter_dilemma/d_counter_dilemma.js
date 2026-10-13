
function add() {
	let num = 1;
	
	return function() {
		console.log(num);
		num++;
	};
}

let func1 = add(); // the first counter
func1();  //shows 1
func1();  //shows 2

let func2 = add(); // the second counter
func2();  //shows 1
func2();  //shows 2



  // the counter is now 3
  //The "wonderful" part is that it can access the counter in the parent scope.

//This is called a JavaScript closure. It makes it possible for a function to have "private" variables.


 
