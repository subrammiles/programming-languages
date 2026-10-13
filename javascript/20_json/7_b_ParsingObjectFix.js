

let jsonString={"name":"Trump","city":"New York","marks":[23,45,67,34]};
let y=parse(jsonString);
console.log(y)
function parse(data){
    if (typeof data === 'object')
        return data; // dont parse if its object
    else if (typeof userData === 'string')
      return  JSON.parse(data); // parse if its string
}
