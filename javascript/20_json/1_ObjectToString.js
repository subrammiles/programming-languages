
const person = {
    name: "Trump",
    city: "New York",
    age: function () {return 30;},
    marks:[23,45,67,34]
  }; 
  let myString = String(person);
  let myJSONString=JSON.stringify(person);

  console.log("<<<<<With String>>>>")
  console.log(myString);
  console.log("<<<<<<<MY JSON String>>>>>")
  console.log(myJSONString)


