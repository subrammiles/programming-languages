// Variables: a type and a name. C# is statically typed: a variable's type never changes.
//  - var lets the compiler infer the type from the value (still static!)
//  - const = compile-time constant; readonly = set once (fields)
//  - local variables must be assigned before they're used
// Run: dotnet run 01_variables_and_types/a_variables.cs

int age = 30;
double price = 19.99;
char grade = 'A';
string name = "Subbu";
bool isActive = true;
Console.WriteLine($"{name} is {age}, grade {grade}, paid {price}, active {isActive}");

var city = "Hyderabad"; // inferred: string
var count = 10;         // inferred: int
Console.WriteLine($"{city.GetType().Name} {count.GetType().Name}"); // String Int32
// count = "ten"; // error CS0029: Cannot implicitly convert type 'string' to 'int'

const double Pi = 3.14159;
// Pi = 3;        // error CS0131: The left-hand side of an assignment must be a variable
Console.WriteLine($"Area of r=2: {Pi * 2 * 2}");

int a = 1, b = 2;
(a, b) = (b, a); // swap with a tuple
Console.WriteLine($"a={a}, b={b}"); // a=2, b=1

int notAssigned;
// Console.WriteLine(notAssigned); // error CS0165: Use of unassigned local variable
notAssigned = 5;
Console.WriteLine(notAssigned);
