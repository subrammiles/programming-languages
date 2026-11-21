"""
Behavioural patterns: strategy, observer, command, template method, state,
and dependency injection

In Python a "strategy" or "command" is often just a function, and an interface is a Protocol
(structural typing: any object with the right methods fits, no inheritance needed).
"""
from abc import ABC, abstractmethod
from collections import defaultdict
from typing import Callable, Protocol

# ---- Strategy: functions are interchangeable algorithms ----
def regular(amount):
    return amount


def sale(percent):
    return lambda amount: amount * (1 - percent / 100)


def checkout(amount, pricing: Callable[[float], float] = regular):
    return round(pricing(amount), 2)


print(checkout(50), checkout(50, sale(20)), checkout(50, lambda a: max(0, a - 5)))   # 50 40.0 45


# ---- Observer: subscribers are notified of events ----
class EventBus:
    def __init__(self):
        self._subscribers = defaultdict(list)

    def subscribe(self, event, callback):
        self._subscribers[event].append(callback)
        return lambda: self._subscribers[event].remove(callback)   # unsubscribe function

    def publish(self, event, **data):
        for callback in list(self._subscribers[event]):
            callback(**data)


bus = EventBus()
bus.subscribe("order_paid", lambda order_id: print(f"  email receipt for {order_id}"))
stop = bus.subscribe("order_paid", lambda order_id: print(f"  update stock for {order_id}"))
bus.publish("order_paid", order_id=1001)
stop()
bus.publish("order_paid", order_id=1002)
#   email receipt for 1001
#   update stock for 1001
#   email receipt for 1002


# ---- Command: requests as objects, so they can be queued, logged and undone ----
class TextEditor:
    def __init__(self):
        self.text, self._history = "", []

    def execute(self, command):
        command.do(self)
        self._history.append(command)

    def undo(self):
        if self._history:
            self._history.pop().undo(self)


class Append:
    def __init__(self, s):
        self.s = s

    def do(self, editor):
        editor.text += self.s

    def undo(self, editor):
        editor.text = editor.text[: -len(self.s)]


ed = TextEditor()
for word in ("Hello", ", ", "world"):
    ed.execute(Append(word))
print(ed.text)          # Hello, world
ed.undo()
ed.undo()
print(ed.text)          # Hello


# ---- Template method: the base class fixes the steps, subclasses fill in some of them ----
class DataExporter(ABC):
    def export(self, rows):                        # the template
        rows = [r for r in rows if r]              # shared step
        return self.header() + "\n" + "\n".join(self.format_row(r) for r in rows)

    @abstractmethod
    def format_row(self, row): ...

    def header(self):                              # a "hook" with a default
        return "# export"


class CsvExporter(DataExporter):
    def format_row(self, row):
        return ",".join(map(str, row))


print(CsvExporter().export([(1, "a"), None, (2, "b")]))
# # export
# 1,a
# 2,b


# ---- State: behaviour changes with internal state, without big if/else blocks ----
class Draft:
    def next(self, doc):
        doc.state = InReview()
        return "sent to review"


class InReview:
    def next(self, doc):
        doc.state = Published()
        return "published"


class Published:
    def next(self, doc):
        return "already published"


class Document:
    def __init__(self):
        self.state = Draft()

    def advance(self):
        return self.state.next(self)


doc = Document()
print([doc.advance() for _ in range(3)])   # ['sent to review', 'published', 'already published']


# ---- Dependency injection with a Protocol ----
class Mailer(Protocol):
    def send(self, to: str, body: str) -> None: ...


class SignupService:
    def __init__(self, mailer: Mailer):          # depend on the interface, receive the object
        self.mailer = mailer

    def register(self, email):
        # ... save the user ...
        self.mailer.send(email, "Welcome!")
        return f"registered {email}"


class FakeMailer:                                # no inheritance needed: it just has send()
    def __init__(self):
        self.sent = []

    def send(self, to, body):
        self.sent.append((to, body))


fake = FakeMailer()
print(SignupService(fake).register("ann@example.com"), fake.sent)
# registered ann@example.com [('ann@example.com', 'Welcome!')]
# In tests, pass the fake; in production, pass a real SMTP mailer. (unittest.mock also helps: chapter 19.)
