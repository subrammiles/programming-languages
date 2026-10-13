try {
  //Block of code to try
} catch (err) {
  //Block of code to handle errors
} finally {
  //Block of code to be executed regardless of the try / catch result
}

try {
  //let x=0/0;
  console.log(x);
} catch (err) {
  console.log(err);
} finally {
  console.log("IN Finally block");
}
