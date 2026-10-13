"""
A constructor that takes only self, and one with default values.
If a class has no __init__, Python uses an empty default one.
"""


class Logger:
    def __init__(self):
        print("Logger created")
        self.messages = []

    def log(self, message):
        self.messages.append(message)


class Account:
    def __init__(self, owner, balance=0):  # default value -> optional argument
        self.owner = owner
        self.balance = balance


log = Logger()  # Logger created
log.log("started")
print(log.messages)  # ['started']

print(Account("Asha").balance, Account("Ravi", 500).balance)  # 0 500
