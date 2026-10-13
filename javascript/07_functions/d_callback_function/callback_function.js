function sum(a, b) {
  console.log(a + b);
}

function mul(a, b) {
  console.log(a * b);
}

function sub(a, b) {
  console.log(a - b);
}

function div(a, b) {
  console.log(a / b);
}

function doArithmeticOperation(operationFunction) {
  operationFunction(10, 10);
}
doArithmeticOperation(mul);
