// Grouping, joining and newer LINQ methods
//  GroupBy  ToLookup  Join  GroupJoin  SelectMany  Zip  Chunk
//  .NET 6+: MinBy, MaxBy, DistinctBy, Chunk     .NET 9: CountBy, AggregateBy, Index
// Run: dotnet run 10_linq/b_grouping_and_joins.cs

List<Order> orders =
[
    new(1, "C1", 250m), new(2, "C2", 900m), new(3, "C1", 120m), new(4, "C3", 75m), new(5, "C2", 40m),
];
List<Customer> customers = [new("C1", "Asha"), new("C2", "Ravi"), new("C3", "Meena")];

foreach (var g in orders.GroupBy(o => o.CustomerId).OrderBy(g => g.Key))
    Console.WriteLine($"{g.Key}: {g.Count()} orders, total {g.Sum(o => o.Amount)}");
// C1: 2 orders, total 370 ...

var report = from o in orders
             join c in customers on o.CustomerId equals c.Id
             group o by c.Name into g
             orderby g.Sum(o => o.Amount) descending
             select new { Customer = g.Key, Total = g.Sum(o => o.Amount) };
foreach (var r in report) Console.WriteLine($"{r.Customer,-6} {r.Total,6}"); // Ravi 940, Asha 370, Meena 75

Console.WriteLine(orders.MaxBy(o => o.Amount)); // Order { Id = 2, CustomerId = C2, Amount = 900 }

foreach (var (customerId, count) in orders.CountBy(o => o.CustomerId)) // .NET 9
    Console.Write($"{customerId}={count} ");
Console.WriteLine();

foreach (var (index, order) in orders.Take(2).Index()) // .NET 9
    Console.Write($"#{index}:{order.Id} ");
Console.WriteLine();

foreach (var chunk in Enumerable.Range(1, 7).Chunk(3))
    Console.Write($"[{string.Join(",", chunk)}] "); // [1,2,3] [4,5,6] [7]
Console.WriteLine();

string[][] tags = [["a", "b"], ["b", "c"]];
Console.WriteLine(string.Join(",", tags.SelectMany(t => t).Distinct())); // a,b,c -> flatten
Console.WriteLine(string.Join(",", new[] { 1, 2, 3 }.Zip(["one", "two", "three"], (n, w) => $"{n}={w}")));

record Order(int Id, string CustomerId, decimal Amount);
record Customer(string Id, string Name);
