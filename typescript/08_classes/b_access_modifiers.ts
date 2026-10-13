/*
Access modifiers
 public     visible everywhere (the default)
 private    only inside this class        (checked by TypeScript only)
 protected  this class and its subclasses (checked by TypeScript only)
 #field     JavaScript private field: enforced at RUNTIME too
 readonly   can only be set in the declaration or constructor
*/

class Employee {
  public name: string;
  private salary: number;
  protected department = "IT";
  readonly id: number;
  #ssn: string; // truly private, even from JavaScript code

  constructor(name: string, salary: number, ssn: string) {
    this.name = name;
    this.salary = salary;
    this.id = Math.floor(Math.random() * 1000);
    this.#ssn = ssn;
  }

  public getSalary(): number {
    return this.salary;
  }

  maskedSsn(): string {
    return "***-**-" + this.#ssn.slice(-4);
  }
}

class Manager extends Employee {
  describe(): string {
    return `${this.name} manages ${this.department}`; // protected is visible in subclasses
    // return this.salary; // error TS2341: Property 'salary' is private
  }
}

const e = new Employee("Asha", 90000, "123-45-6789");
console.log(e.name, e.getSalary(), e.maskedSsn()); // Asha 90000 ***-**-6789
// e.salary;      // error TS2341: Property 'salary' is private and only accessible within class 'Employee'.
// e.id = 5;      // error TS2540: Cannot assign to 'id' because it is a read-only property.
console.log(new Manager("Ravi", 1, "000-00-0000").describe()); // Ravi manages IT

console.log(Object.keys(e)); // [ 'name', 'salary', 'department', 'id' ] -> private is visible at runtime, #ssn is not
