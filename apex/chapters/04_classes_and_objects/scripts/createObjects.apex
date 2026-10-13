// Creating objects from saved classes.
// (Classes are defined in classes/*.cls and deployed first. Anonymous Apex CAN declare
//  classes too, but they can't have static members, so real code always uses .cls files.)
// Run: sf apex run --file chapters/04_classes_and_objects/scripts/createObjects.apex

System.debug(Greeter.sayHello()); // static: called on the class

Greeter myObject = new Greeter('Subbu'); // new creates an object
System.debug(myObject.greet()); // Hello, Subbu!
System.debug(myObject.greet('Good morning')); // Good morning, Subbu!

BankAccount acc = new BankAccount('Asha', 1000);
acc.deposit(500);
acc.withdraw(200);
System.debug(acc.owner + ' has ' + acc.displayBalance); // Asha has INR 1300.00
for (BankAccount.Entry t : acc.history) {
    System.debug(t.kind + ' ' + t.amount);
}
// acc.balance = 1000000; // compile error: the setter is private
