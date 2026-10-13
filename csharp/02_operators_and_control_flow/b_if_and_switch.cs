// if / else, the switch statement, and switch EXPRESSIONS (C# 8+) with patterns.
// Run: dotnet run 02_operators_and_control_flow/b_if_and_switch.cs

static string Grade(int marks)
{
    if (marks >= 90) return "A";
    else if (marks >= 75) return "B";
    else if (marks >= 35) return "C";
    return "Fail";
}

static string DayType(DayOfWeek day)
{
    switch (day)
    {
        case DayOfWeek.Saturday:
        case DayOfWeek.Sunday:
            return "weekend";
        default:
            return "weekday"; // every section must end with break, return or throw: no fall-through
    }
}

// A switch expression: concise, returns a value, and the compiler checks it's exhaustive
static string Describe(int temperature) => temperature switch
{
    < 0 => "freezing",
    >= 0 and < 15 => "cold",
    >= 15 and < 25 => "pleasant",
    _ => "hot", // _ = anything else
};

static decimal ShippingCost(string country, decimal weight) => (country, weight) switch
{
    ("IN", < 1) => 50,
    ("IN", _) => 100,
    ("US", _) => 25 * weight,
    _ => throw new ArgumentException($"we don't ship to {country}"),
};

Console.WriteLine($"{Grade(95)} {Grade(80)} {Grade(40)} {Grade(10)}"); // A B C Fail
Console.WriteLine($"{DayType(DayOfWeek.Sunday)} {DayType(DayOfWeek.Tuesday)}"); // weekend weekday
Console.WriteLine($"{Describe(-5)} {Describe(10)} {Describe(20)} {Describe(35)}"); // freezing cold pleasant hot
Console.WriteLine($"{ShippingCost("IN", 0.5m)} {ShippingCost("IN", 3)} {ShippingCost("US", 2)}"); // 50 100 50
try
{
    ShippingCost("FR", 1);
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message); // we don't ship to FR
}
