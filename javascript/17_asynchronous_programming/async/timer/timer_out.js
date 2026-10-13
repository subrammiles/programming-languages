
/*
setTimeout does not (yet?) return a promise that could be awaited.
*/


async function test(){
  console.log("1")
  await setTimeout(()=>{console.log("2")},1000) 
  /*await won't work because setTimeout is not a async function  */
  console.log("3")
}


test()

///solution
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(fn, ...args) {
  await timeout(3000);
  return fn(...args);
}