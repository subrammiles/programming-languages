"""
enum - a fixed set of named constants
 Enum      general constants
 IntEnum   members are also ints
 StrEnum   members are also strings (3.11), handy for JSON and APIs
 Flag      combinable with | (permissions)
 auto()    let Python choose the values
"""
from enum import Enum, Flag, IntEnum, StrEnum, auto


class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3


class Status(StrEnum):
    PENDING = auto()  # value becomes "pending"
    SHIPPED = auto()
    DELIVERED = auto()


class Priority(IntEnum):
    LOW = 1
    HIGH = 3


class Permission(Flag):
    READ = auto()
    WRITE = auto()
    EXECUTE = auto()


print(Color.RED, Color.RED.name, Color.RED.value)  # Color.RED RED 1
print(Color(2), Color["BLUE"])  # Color.GREEN Color.BLUE
print([c.name for c in Color])  # ['RED', 'GREEN', 'BLUE']
print(Color.RED is Color(1))  # True -> compare with "is" or ==

print(Status.SHIPPED, Status.SHIPPED == "shipped")  # shipped True
print(Priority.HIGH > Priority.LOW, Priority.HIGH + 1)  # True 4

perms = Permission.READ | Permission.WRITE
print(Permission.WRITE in perms, Permission.EXECUTE in perms)  # True False


def describe(status: Status) -> str:
    match status:
        case Status.PENDING:
            return "waiting"
        case Status.SHIPPED:
            return "on the way"
        case Status.DELIVERED:
            return "done"


print(describe(Status("delivered")))  # done
