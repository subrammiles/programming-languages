/*
Syntax
you_label_name:
  statement 
*/

//Prints odd numbers
let str = '';
my_label:
for (let i = 0; i < 10; i++) {
  if (i % 2== 0) {
    continue my_label;
  }
  str = str + i+" ,";
}
console.log(str);

  
