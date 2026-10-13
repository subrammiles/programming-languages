"""
Operator precedence (highest first):
 ()  ->  **  ->  +x -x ~x  ->  * / // %  ->  + -  ->  << >>  ->  &  ->  ^  ->  |
 ->  comparisons, in, is  ->  not  ->  and  ->  or  ->  if-else  ->  :=
When in doubt, add parentheses.
"""
print(2 + 3 * 4)  # 14
print((2 + 3) * 4)  # 20
print(2 ** 3 ** 2)  # 512 -> ** groups right to left: 2 ** 9
print(-2 ** 2)  # -4 -> ** before the minus sign
print(not True or True)  # True -> (not True) or True
print(True or False and False)  # True -> and before or
