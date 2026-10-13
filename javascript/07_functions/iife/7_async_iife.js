


(async function test() {
    console.log("Before async")
    await new Promise((resolve, reject) => { setTimeout(() => { resolve("Done") },6000) });
    console.log("After async")
}())