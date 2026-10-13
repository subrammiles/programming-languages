// Generic collections (System.Collections.Generic)
//  List<T>               a growable array
//  Dictionary<TKey,TValue>  key -> value lookups
//  HashSet<T>            unique values, fast Contains
//  Queue<T>, Stack<T>, LinkedList<T>, SortedDictionary<,>, PriorityQueue<,>
// Run: dotnet run 04_collections/b_list_dictionary_set.cs

List<string> colors = ["red", "green"];
colors.Add("blue");
colors.Insert(0, "black");
colors.Remove("green");
Console.WriteLine($"{string.Join(",", colors)} count={colors.Count} has blue={colors.Contains("blue")}");
colors.Sort();
Console.WriteLine(string.Join(",", colors)); // black,blue,red

var stock = new Dictionary<string, int> { ["pen"] = 10, ["book"] = 4 };
stock["bag"] = 2; // add or replace
stock["pen"] += 5;
Console.WriteLine(stock["pen"]); // 15
if (stock.TryGetValue("ink", out int ink)) Console.WriteLine(ink);
else Console.WriteLine("no ink"); // stock["ink"] would throw KeyNotFoundException
foreach (var (item, qty) in stock) Console.Write($"{item}={qty} ");
Console.WriteLine();

var counts = new Dictionary<string, int>();
foreach (string word in "the cat and the hat".Split(' '))
    counts[word] = counts.GetValueOrDefault(word) + 1;
Console.WriteLine(counts["the"]); // 2

var tags = new HashSet<string> { "csharp", "dotnet", "csharp" };
Console.WriteLine(tags.Count); // 2
tags.IntersectWith(["dotnet", "azure"]);
Console.WriteLine(string.Join(",", tags)); // dotnet

var queue = new Queue<string>(["first", "second"]);
var stack = new Stack<int>([1, 2, 3]);
Console.WriteLine($"{queue.Dequeue()} {stack.Pop()}"); // first 3

var tasks = new PriorityQueue<string, int>();
tasks.Enqueue("write docs", 3);
tasks.Enqueue("fix outage", 1);
Console.WriteLine(tasks.Dequeue()); // fix outage -> lowest priority value first
