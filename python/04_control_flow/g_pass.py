"""
pass does nothing. Use it where Python needs a statement but you have nothing to write yet:
an empty function, class, loop or if-branch. Without it you get an IndentationError.
"""


def todo():
    pass


class NotReadyYet:
    pass


a = 2
if a == 2:
    pass  # handle this case later

for i in [1, 2, 3, 4, 5]:
    if i == 2:
        pass
    elif i == 3:
        print("i = 3")
    else:
        print("other value:", i)

# ... (Ellipsis) is also often used as a placeholder:
def also_todo(): ...
