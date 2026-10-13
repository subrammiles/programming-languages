

const person = {
    name: "Trump",
    city: "New York",
    age: function () {return 30;},
    marks:[23,45,67,34]
  };

  for(let key in person){
    if(Object.prototype.hasOwnProperty.call(person, key)){
        person.key=person[key].toString();
    }
  }

  console.log(person)


  
//   function objToString (obj) {
//     var str = '';
//     for (var p in obj) {
//         if (Object.prototype.hasOwnProperty.call(obj, p)) {
//             str += p + '::' + obj[p] + '\n';
//         }
//     }
//     return str;
// }