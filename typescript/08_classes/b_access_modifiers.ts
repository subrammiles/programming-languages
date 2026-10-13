
///1.public 2.private 3.Protacted

class Person2{
   public name:string;
   private salary:number;

   public getSalary():number{
      return this.salary;
   }
}

let p23=new Person2();
console.log(p23.getSalary());
console.log(p23.name);
