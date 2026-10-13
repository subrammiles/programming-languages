
async function addTwoNumbers(a,b) {
    try{
        await Promise.reject(new Error("OOPS!!!"))  
    }catch(ere){
      console.log(ere)
    }
 }
 async function sum(){
    try{
        const result =await  addTwoNumbers(1,2);
        console.log(result); 
    }catch(ere){
      console.log(ere)
    }
 }
 sum();