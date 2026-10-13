/*Proto type is the property of an object*/
/*Every object in JavaScript has a built-in private  property, which is called its prototype.  */
let a=2;
let b=true;
let c=[1,2,3,4];
let d=function(){
  console.log("Something")
}
const e = {
  city: "Madrid",
  greet() {
    console.log(`Greetings from ${this.city}`);
  },
};
const f=class Test{

}
let aProtoType=a.__proto__; //Number (0)
let bProtoType=b.__proto__; //Boolen (false)
let cProtoType=c.__proto__; //
let dProtoType=d.__proto__; //
let eProtoType=e.__proto__; //
let fProtoType=f.__proto__; //

///Another way to get Prototype
console.log(Object.getPrototypeOf(e)); 