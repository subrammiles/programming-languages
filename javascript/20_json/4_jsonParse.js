

let x={"name":"Trump","city":"New York","marks":[23,45,67,34]};
let jsonString=JSON.stringify(x);
let y=JSON.parse(jsonString);
console.log(y.city)