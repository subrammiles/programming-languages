# Testing

A small real **solution**: a class library and an **xUnit v3** test project.

```
15_testing/
├── Shop.slnx                      <- the solution (new XML format)
├── global.json                    <- tells "dotnet test" to use Microsoft.Testing.Platform (.NET 10)
├── src/Shop/                      <- the code under test (a class library)
│   ├── Cart.cs
│   └── PriceService.cs
└── tests/Shop.Tests/              <- the tests (references src/Shop)
    ├── CartTests.cs               <- [Fact], [Theory]/[InlineData], Assert.Throws, fakes
    └── PriceServiceTests.cs       <- async tests, a recording fake
```

```bash
cd 15_testing
dotnet test                                   # build and run every test
dotnet test --filter-class "*CartTests"      # only some tests
dotnet test --coverage                       # coverage (needs Microsoft.Testing.Extensions.CodeCoverage)
```

Created with `dotnet new sln`, `dotnet new classlib`, `dotnet new xunit`, then upgraded to xUnit v3.
Other popular choices: **NUnit**, **MSTest**, and libraries like **NSubstitute** or **Moq** (fakes),
**FluentAssertions**/**Shouldly** (readable assertions), **Testcontainers** (real databases in tests).
