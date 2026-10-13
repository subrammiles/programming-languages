/*
The prototype is itself an object, so the prototype will 
have its own prototype, making what's called a prototype chain. 
The chain ends when we reach a prototype that has null for 
its own prototype.
*/

const a = {
  city: "Madrid",
  greet() {
    console.log(`Greetings from ${this.city}`);
  },
};


let protoTypeA=a.__proto__;
let protoTypeOfProtoTypeA=a.__proto__.__proto__;
console.log(protoTypeOfProtoTypeA);