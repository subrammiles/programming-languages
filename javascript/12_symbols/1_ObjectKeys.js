// Until symbols existed, object keys could only be strings. 
//If we ever attempt to use a non-string value as a key for an object, 
//the value will be coerced to a string.
const obj = {};
obj.foo = 'foo';
obj['bar'] = 'bar';
obj[2] = 2;
obj[{}] = 'someobj';
console.log(obj);
// { '2': 2, foo: 'foo', bar: 'bar',
 //    '[object Object]': 'someobj' }