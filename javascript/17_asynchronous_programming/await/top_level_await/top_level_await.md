

1. npm init -y
This will create  package.json file
2.Open the package.json file and set the type attribute to module.
  "type":"module"
3.Now you can use top-level await in your Node.js code

# Code:
async function testFunc(){
  console.log("test")
}
await testFunc()
