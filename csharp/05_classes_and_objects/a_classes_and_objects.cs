// Classes and objects
//  A class is a blueprint; new creates an object (an instance) on the heap.
//  Fields hold data, methods hold behaviour, constructors set up new objects.
//  Access modifiers: public, private (the default), protected, internal.
// Run: dotnet run 05_classes_and_objects/a_classes_and_objects.cs

var account = new BankAccount("Asha", 500);
account.Deposit(250);
Console.WriteLine(account.Withdraw(1000)); // False
Console.WriteLine(account.Withdraw(100)); // True
Console.WriteLine(account); // Asha: 650.00 (ToString is called automatically)

var other = account; // copies the REFERENCE: both names point at one object
other.Deposit(50);
Console.WriteLine(account.Balance); // 700

Console.WriteLine(BankAccount.Count); // 1 -> a static member belongs to the class

class BankAccount
{
    private decimal _balance; // a private field
    public static int Count { get; private set; }

    public string Owner { get; } // a read-only property

    public decimal Balance => _balance; // a computed, read-only property

    public BankAccount(string owner, decimal openingBalance) // constructor
    {
        Owner = owner;
        _balance = openingBalance;
        Count++;
    }

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount), "must be positive");
        _balance += amount;
    }

    public bool Withdraw(decimal amount)
    {
        if (amount > _balance) return false;
        _balance -= amount;
        return true;
    }

    public override string ToString() => $"{Owner}: {_balance:F2}";
}
