// LINQ (Language Integrated Query): query any collection with one set of methods.
//  Where (filter)  Select (map)  OrderBy/ThenBy (sort)  First/Single/Any/All/Count
//  Sum/Min/Max/Average  Take/Skip  Distinct  ToList/ToArray/ToDictionary
// LINQ is LAZY: nothing runs until you enumerate the result (foreach, ToList ...).
// Run: dotnet run 10_linq/a_linq_basics.cs

int[] numbers = [5, 3, 8, 3, 1, 9, 2];

var evensSquared = numbers.Where(n => n % 2 == 0).Select(n => n * n);
Console.WriteLine(string.Join(",", evensSquared)); // 64,4
Console.WriteLine(string.Join(",", numbers.Distinct().Order())); // 1,2,3,5,8,9
Console.WriteLine(string.Join(",", numbers.OrderDescending().Take(3))); // 9,8,5
Console.WriteLine($"{numbers.Sum()} {numbers.Max()} {numbers.Average():F2} {numbers.Count(n => n > 4)}"); // 31 9 4.43 3
Console.WriteLine($"{numbers.Any(n => n > 8)} {numbers.All(n => n > 0)} {numbers.First(n => n > 5)}"); // True True 8
Console.WriteLine(numbers.FirstOrDefault(n => n > 100)); // 0 -> the default instead of an exception

List<Employee> staff =
[
    new("Asha", "IT", 90_000, 30),
    new("Ravi", "IT", 70_000, 25),
    new("Meena", "HR", 60_000, 41),
    new("Kiran", "Sales", 55_000, 35),
];

var seniors = staff
    .Where(e => e.Age > 28)
    .OrderBy(e => e.Dept).ThenByDescending(e => e.Salary)
    .Select(e => $"{e.Name} ({e.Dept})");
Console.WriteLine(string.Join(", ", seniors)); // Meena (HR), Asha (IT), Kiran (Sales)

// Query syntax: the same thing, written like SQL
var itNames = from e in staff
              where e.Dept == "IT"
              orderby e.Name
              select e.Name;
Console.WriteLine(string.Join(", ", itNames)); // Asha, Ravi

var byName = staff.ToDictionary(e => e.Name);
Console.WriteLine(byName["Kiran"].Salary); // 55000

var lazy = numbers.Select(n => { Console.Write($"[{n}]"); return n; }).Take(2);
Console.WriteLine("query built, nothing printed yet");
Console.WriteLine($" -> {lazy.Sum()}"); // [5][3] -> 8

record Employee(string Name, string Dept, decimal Salary, int Age);
