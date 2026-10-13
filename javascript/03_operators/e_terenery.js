
/*
The conditional (ternary) operator is the only JavaScript operator that takes three operands: a condition followed by a question mark (?), then an expression to execute if the 
condition is truthy followed by a colon (:)
*/
//condition ? exprIfTrue : exprIfFalse

//Program to check leap year

year = 2022;
x = (year % 100 == 0) ? (year % 400 == 0) : (year % 4 == 0);
console.log(x);


/*
One common usage is to handle a value that may be null:
*/
const greeting = (person) => {
    const name = person ? person.name : "stranger";
    return `Howdy, ${name}`;
  };
  
  console.log(greeting({ name: "Alice" })); // "Howdy, Alice"
  console.log(greeting(null)); // "Howdy, stranger"
