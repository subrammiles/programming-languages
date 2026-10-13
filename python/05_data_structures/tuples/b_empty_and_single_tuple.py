"""
Empty tuple: ()
One-item tuple needs a trailing comma: (5,)  -> (5) is just the number 5
"""
empty = ()
print(empty, len(empty))  # () 0

not_a_tuple = (5)
single = (5,)
print(type(not_a_tuple).__name__, type(single).__name__)  # int tuple
