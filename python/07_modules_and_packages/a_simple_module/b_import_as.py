"""
Other import forms
 import module as alias
 from module import name
 from module import name as alias
 from module import *      (imports everything public; avoid, it hides where names came from)
"""
import mysquare as mysq
from mysquare import PI
from mysquare import square as sq

print("square via alias:", mysq.square(4))  # 16
print("square via from-import:", sq(5))  # 25
print(PI)  # 3.14159

import math
print(dir(math)[-5:])  # dir() lists the names a module defines
