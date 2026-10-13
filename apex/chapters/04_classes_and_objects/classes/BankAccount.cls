/**
 * Properties, encapsulation and inner classes.
 *  Property:            public String owner { get; set; }       (automatic)
 *  Read-only outside:   public Decimal balance { get; private set; }
 *  Custom logic:        get { ... } set { ... }   (value = the new value)
 *  Inner classes can't have static members.
 */
public with sharing class BankAccount {
    public String owner { get; set; }
    public Decimal balance { get; private set; }
    public List<Entry> history { get; private set; }

    public String displayBalance {
        get {
            return 'INR ' + balance.setScale(2);
        }
    }

    public BankAccount(String owner, Decimal openingBalance) {
        this.owner = owner;
        this.balance = openingBalance;
        this.history = new List<Entry>();
    }

    public void deposit(Decimal amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException('Deposit must be positive');
        }
        balance += amount;
        history.add(new Entry('deposit', amount));
    }

    public Boolean withdraw(Decimal amount) {
        if (amount > balance) {
            return false;
        }
        balance -= amount;
        history.add(new Entry('withdraw', amount));
        return true;
    }

    // An inner class: only meaningful together with its outer class
    public class Entry {
        public String kind { get; private set; }
        public Decimal amount { get; private set; }

        public Entry(String kind, Decimal amount) {
            this.kind = kind;
            this.amount = amount;
        }
    }
}
