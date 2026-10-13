package com.example.bank;

public class InsufficientFundsException extends RuntimeException {

    private final long shortBy;

    public InsufficientFundsException(long shortBy) {
        super("short by " + shortBy);
        this.shortBy = shortBy;
    }

    public long shortBy() { return shortBy; }
}
