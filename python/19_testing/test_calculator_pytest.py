"""
pytest - the most popular testing tool (install it: pip install pytest)
 - tests are plain functions starting with test_
 - plain assert statements, with detailed failure messages
 - fixtures provide fresh test data; parametrize runs a test with many inputs
Run:  python3 -m pytest -v          (from this folder)
pytest also runs unittest-style tests and doctests (--doctest-modules).
"""
import pytest

from calculator import ShoppingCart, add, divide, is_palindrome


def test_add():
    assert add(2, 3) == 5


@pytest.mark.parametrize(
    ("a", "b", "expected"),
    [(1, 1, 2), (-1, 1, 0), (0.1, 0.2, pytest.approx(0.3))],
)
def test_add_many(a, b, expected):
    assert add(a, b) == expected


def test_divide_by_zero():
    with pytest.raises(ValueError, match="zero"):
        divide(1, 0)


@pytest.mark.parametrize("text", ["racecar", "Never odd or even", "a"])
def test_palindromes(text):
    assert is_palindrome(text)


@pytest.fixture
def cart():
    c = ShoppingCart()
    c.add("book", 250)
    return c


def test_cart_total(cart):
    cart.add("pen", 10, qty=3)
    assert cart.total() == 280


def test_fixture_is_fresh(cart):
    assert cart.total() == 250  # not affected by the previous test


def test_monkeypatch(monkeypatch):
    monkeypatch.setenv("APP_MODE", "test")
    import os
    assert os.environ["APP_MODE"] == "test"
