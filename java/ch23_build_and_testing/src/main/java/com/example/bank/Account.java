package com.example.bank;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/*
The code under test: a simple bank account.
*/
public class Account {

    private final String owner;
    private long balance;
    private final List<String> history = new ArrayList<>();

    public Account(String owner, long openingBalance) {
        if (owner == null || owner.isBlank()) throw new IllegalArgumentException("owner is required");
        if (openingBalance < 0) throw new IllegalArgumentException("opening balance cannot be negative");
        this.owner = owner;
        this.balance = openingBalance;
    }

    public void deposit(long amount) {
        if (amount <= 0) throw new IllegalArgumentException("deposit must be positive");
        balance += amount;
        history.add("deposit " + amount);
    }

    public void withdraw(long amount) {
        if (amount <= 0) throw new IllegalArgumentException("withdrawal must be positive");
        if (amount > balance) throw new InsufficientFundsException(amount - balance);
        balance -= amount;
        history.add("withdraw " + amount);
    }

    public void transferTo(Account other, long amount) {
        withdraw(amount);
        other.deposit(amount);
    }

    public long balance() { return balance; }

    public String owner() { return owner; }

    public List<String> history() { return Collections.unmodifiableList(history); }
}
