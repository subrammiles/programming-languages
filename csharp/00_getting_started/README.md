# Getting started

## Install
Install the **.NET 10 SDK** (the current long-term-support release, with C# 14):
https://dotnet.microsoft.com/download  → check with `dotnet --version`

Editor: **VS Code** with the **C# Dev Kit** extension, Visual Studio, or JetBrains Rider.

## Running the examples
Every example here is a single file you can run directly (".NET file-based apps", new in .NET 10):
```bash
cd csharp
dotnet run 00_getting_started/hello_world.cs
dotnet run 00_getting_started/hello_world.cs -- Asha     # pass arguments after --
```
The first run takes a little longer while .NET builds and caches the program.

## Real projects
Larger programs use a **project** (a `.csproj` file) and often a **solution**:
```bash
dotnet new console -n MyApp     # create a console app
cd MyApp && dotnet run
dotnet new list                 # web APIs, class libraries, tests, Blazor, MAUI ...
```
Chapter 16 (testing) is a small real solution with a class library and a test project.
A single file can be turned into a project with `dotnet project convert file.cs`.
