

function Person(firstName,lastName,age){
   this.fs=firstName;
   this.ls=lastName;
   this.age=age;
}

//Sex and Country is not preset in Persion.
//Only firstName and lastName present.
//Now try to add sex and Country.Add Country to Person as a constractor
//Add sex to object created

Person.country="India"
let p1=new Person("Subbu","P",20);
let p2=new Person("Gubbu","Y",22);

console.log(p1);
console.log(p2);
p1.sex="M";
console.log("Check sex and country values")
console.log(p1.sex);
console.log(p1.country);//It will be undefined

