// JSON with System.Text.Json (built in)
//  JsonSerializer.Serialize(obj)   / Deserialize<T>(json)
//  options: camelCase names, indentation, enums as strings
//  attributes: [JsonPropertyName], [JsonIgnore]
//  JsonNode for JSON whose shape you don't know in advance
//  Source generation: [JsonSerializable] makes the compiler write the (de)serialisation code.
//    It's faster, works with trimming and Native AOT, and is REQUIRED here because .NET 10
//    file-based apps are published as Native AOT by default (reflection-based JSON is off).
// Run: dotnet run 13_files_and_json/b_json.cs

using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

var order = new Order(7, "Asha", [new("pen", 10m), new("book", 250m)], Status.Paid) { InternalNote = "VIP" };
string json = JsonSerializer.Serialize(order, AppJson.Default.Order);
Console.WriteLine(json);

Order back = JsonSerializer.Deserialize(json, AppJson.Default.Order)!;
Console.WriteLine($"{back.Customer} ordered {back.Items.Count} items, status {back.Status}, note null? {back.InternalNote is null}");

var node = JsonNode.Parse("""{"user": {"name": "Ravi", "roles": ["admin", "dev"]}}""")!;
Console.WriteLine(node["user"]!["roles"]![1]); // dev
node["user"]!["active"] = true;
Console.WriteLine(node.ToJsonString()); // {"user":{"name":"Ravi","roles":["admin","dev"],"active":true}}

try
{
    JsonSerializer.Deserialize("{ not json", AppJson.Default.Order);
}
catch (JsonException e)
{
    Console.WriteLine($"JsonException at line {e.LineNumber}");
}

// The options: camelCase names (Web defaults), indentation, enums as strings
[JsonSourceGenerationOptions(JsonSerializerDefaults.Web, WriteIndented = true, UseStringEnumConverter = true)]
[JsonSerializable(typeof(Order))]
partial class AppJson : JsonSerializerContext;

enum Status { Pending, Paid, Shipped }

record Item(string Name, decimal Price);

record Order(int Id, string Customer, List<Item> Items, Status Status)
{
    [JsonPropertyName("orderTotal")]
    public decimal Total => Items.Sum(i => i.Price);

    [JsonIgnore]
    public string? InternalNote { get; init; }
}
