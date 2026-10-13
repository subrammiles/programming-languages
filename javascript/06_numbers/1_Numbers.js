let x = 123;
let y=345.4556;
let z="2"
console.log("<<<<<<<<<<<<<<To String>>>>>>>>>>>")
console.log(x.toString())
console.log((123).toString())
console.log((10+34).toString())

console.log("<<<<<<<<<<<<<<To Exponential>>>>>>>>>>>")
console.log(y.toExponential(2))
console.log(y.toExponential(3))

console.log("<<<<<<<<<<<<<<To Fixed>>>>>>>>>>>")
console.log(y.toFixed(2))

console.log("<<<<<<<<<<<<<<Parse Int>>>>>>>>>>>")
console.log(parseInt(y))
console.log(parseFloat(y))
