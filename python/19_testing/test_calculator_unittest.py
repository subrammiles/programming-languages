"""
unittest - the testing framework built into Python.
 - tests are methods starting with test_ inside a unittest.TestCase subclass
 - setUp() runs before each test
Run:  python3 -m unittest -v test_calculator_unittest   (from this folder)
"""
import unittest
from unittest.mock import patch

from calculator import ShoppingCart, add, divide


class TestMath(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)

    def test_add_strings(self):
        self.assertEqual(add("a", "b"), "ab")

    def test_divide(self):
        self.assertAlmostEqual(divide(1, 3), 0.3333, places=4)

    def test_divide_by_zero(self):
        with self.assertRaises(ValueError):
            divide(1, 0)


class TestCart(unittest.TestCase):
    def setUp(self):
        self.cart = ShoppingCart()

    def test_empty_total(self):
        self.assertEqual(self.cart.total(), 0)

    def test_adding_same_item_twice(self):
        self.cart.add("pen", 10)
        self.cart.add("pen", 10, qty=2)
        self.assertEqual(self.cart.total(), 30)

    def test_negative_price(self):
        with self.assertRaisesRegex(ValueError, "negative"):
            self.cart.add("pen", -1)


class TestMocking(unittest.TestCase):
    @patch("calculator.add", return_value=100)
    def test_mocked(self, fake_add):
        import calculator
        self.assertEqual(calculator.add(1, 1), 100)
        fake_add.assert_called_once_with(1, 1)


if __name__ == "__main__":
    unittest.main()
