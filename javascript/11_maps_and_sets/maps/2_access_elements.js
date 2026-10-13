

//use get() method for accessing its elements.
var map = new Map([[1, "Subbu"], [2, "Trump"]]); 
console.log(map.get(1));

map.set(3,"Govea")

console.log(map)
console.log(map.size);
//Check if key present
console.log(map.has(1));

map.forEach (function(value, key) {
    text += key + ' = ' + value;
  })