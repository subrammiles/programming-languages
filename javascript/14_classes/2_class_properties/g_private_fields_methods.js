/*
Privates should start with #. 
They are only accessible from inside the class.
Protected properties are usually prefixed 
with an underscore “_”
*/
class Employee{
    _salary=1;
    #bonus=44;
    emp_name="Subbu";

    get salary(){
        return this._salary;
    }
    set salary(amount){
        this._salary=amount;
    }
    printBonus(){
        console.log(this.#bonus);
    }
   
}
let employee=new Employee();
console.log(employee._salary);
console.log(employee.bonus);
console.log(employee.emp_name);
console.log(employee.printBonus())