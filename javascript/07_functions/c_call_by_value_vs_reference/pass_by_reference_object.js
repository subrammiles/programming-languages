
//Pass by reference
function changeObj(d){
    d.prop1=14;
    d.prop2=12;
}
var myObject={};
myObject.prop1="Apple";
myObject.prop2="Mango";
console.log("Initial Object value is "+myObject.prop1);
changeObj(myObject)
console.log("Initial Object value is "+myObject.prop1);
/*Remember Object is passed by reference unlike primitive data types */