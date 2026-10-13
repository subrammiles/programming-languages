// C# with "top-level statements": no class or Main method needed for a simple program.
// .NET 10 can run a single .cs file directly:
//     dotnet run 00_getting_started/hello_world.cs
// Common namespaces (System, System.Collections.Generic, System.Linq ...) are imported automatically.

Console.WriteLine("Hello, World!");

string language = "C#";
int year = 2000;
Console.WriteLine($"{language} was first released in {year}."); // $"..." string interpolation

// Command-line arguments are available as "args":
//     dotnet run 00_getting_started/hello_world.cs -- Asha
string name = args.Length > 0 ? args[0] : "stranger";
Console.WriteLine($"Hello, {name}!");
