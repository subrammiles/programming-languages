/*
The value of this always changes based on how a function is called, even when the function was defined on an object at creation:
*/

const obj4 = {
    name: "obj4",
    getThis() {
      return this;
    },
  };
  
  const obj5 = { name: "obj5" };
  
  obj5.getThis = obj4.getThis;
  console.log(obj5.getThis()); // { name: 'obj5', getThis: [Function: getThis] }