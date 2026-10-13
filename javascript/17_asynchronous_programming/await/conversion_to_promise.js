/*
If the value is not a Promise, await converts the value to a 
resolved Promise, and waits for it. 
The awaited value's identity  doesn't change as long as it doesn't have
 a then property that's callable.
*/

async function f3() {
    /*'await' has no effect on the type of this expression */
    const y = await 20;
    console.log(y); // 20
  
    const obj = {};
    console.log((await obj) === obj); // true
  }
  
  f3();