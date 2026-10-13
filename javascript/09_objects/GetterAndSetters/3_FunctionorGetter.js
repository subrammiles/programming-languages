const person1 = {
    firstName: "John",
    lastName: "Doe",
    fullName: function() {
      return this.firstName + " " + this.lastName;
    }
  };

  const person2 = {
    firstName: "John",
    lastName: "Doe",
    get fullName() {
      return this.firstName + " " + this.lastName;
    }
  };
  console.log(person1.fullName())
  console.log(person2.fullName)

//   Example 1 access fullName as a function: person1.fullName().
// Example 2 access fullName as a property: person2.fullName.
// The second example provides a simpler syntax.