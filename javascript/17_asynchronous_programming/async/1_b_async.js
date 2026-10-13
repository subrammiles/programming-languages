

const result =  addTwoNumbers(1,2);
result.then((data)=>{
  console.log(data);
})

///Result is a instance of the promise
async function addTwoNumbers(a,b) {
  return a+b;
}