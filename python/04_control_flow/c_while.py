"""
while repeats as long as its condition is true.
Use it when you don't know in advance how many times to loop.
"""


def count_up():
    print("<<<< count to 4 >>>>")
    x = 0
    while x < 5:
        print(x, end=" ")
        x += 1
    print()


def digits(n):
    count = 0
    while n > 0:
        n //= 10
        count += 1
    return count


def guessing_game():
    print("<<<< while True with break >>>>")
    guesses = iter([3, 8, 5])  # pretend the user typed these
    secret = 5
    while True:
        guess = next(guesses)
        print("guess:", guess)
        if guess == secret:
            print("correct!")
            break


count_up()
print(digits(12345))  # 5
guessing_game()
