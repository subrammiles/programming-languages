"""
Method Resolution Order (MRO)
The order Python searches classes for a method: ClassName.__mro__
With multiple inheritance Python uses the "C3" algorithm, so each class appears once
and children always come before parents. super() follows the MRO, not just "the parent".
"""


class A:
    def hello(self):
        print("A")


class B(A):
    def hello(self):
        print("B")
        super().hello()


class C(A):
    def hello(self):
        print("C")
        super().hello()


class D(B, C):
    def hello(self):
        print("D")
        super().hello()


print([cls.__name__ for cls in D.__mro__])  # ['D', 'B', 'C', 'A', 'object']
D().hello()  # D B C A -> each method runs once ("diamond" problem solved)
