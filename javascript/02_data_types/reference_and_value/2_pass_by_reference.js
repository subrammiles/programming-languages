  
  /*
  non-primitive data types such as objects, arrays, and 
  functions are passed by reference in Javascript
  */
  let obj1 = {website: "Subrahmanyampampana.com"}
  let obj2 = obj1;
  console.log(obj1)     // {website: "Subrahmanyampampana.com"}
  console.log(obj2)     // {website: "Subrahmanyampampana.com"}
  obj1.website = "google.com"
  console.log(obj1)     // {website: "google.com"}
  console.log(obj2)     // {website: "google.com"}

  
  let obj = { count: 1 };
  objectMutator(obj);
  function objectMutator(val) {
    val.count = val.count + 1;
  }
  console.log(obj); // {count: 2}

  console.log("<<<< Array example>>>>>>")
  let arr = [1];
  arrMutator(arr);
  function arrMutator(val) {
    val.push(2);
  }
  console.log(arr); // [1,2]


  