"""
Custom exceptions: subclass Exception (or a more specific built-in).
A base class for your app lets callers catch all of your errors at once.
"""


class BankError(Exception):
    """Base class for all errors from this module."""


class InsufficientFunds(BankError):
    def __init__(self, balance, amount):
        super().__init__(f"cannot withdraw {amount}, balance is only {balance}")
        self.shortfall = amount - balance


class AccountLocked(BankError):
    pass


def withdraw(balance, amount, locked=False):
    if locked:
        raise AccountLocked("account is locked")
    if amount > balance:
        raise InsufficientFunds(balance, amount)
    return balance - amount


try:
    withdraw(100, 250)
except InsufficientFunds as e:
    print(e, "| short by", e.shortfall)

for locked in (True, False):
    try:
        print(withdraw(100, 50, locked))
    except BankError as e:  # catches any error from this module
        print(f"{type(e).__name__}: {e}")
