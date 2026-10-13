from greetings import greet


def test_greet():
    assert greet("Asha") == "Hello, Asha!"


def test_shout():
    assert greet("Asha", shout=True) == "HELLO, ASHA!"
