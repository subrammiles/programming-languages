"""
Using the "shop" package.
Run from the b_package folder:   python3 main.py
Layout:
  b_package/
    main.py
    shop/
      __init__.py
      cart.py
      pricing.py
"""
import shop
from shop import Cart, apply_discount
from shop.pricing import TAX_RATE

cart = Cart()
cart.add("book", 500, 2)
cart.add("pen", 50)
print(cart.total())  # 1239.0 -> (1000 + 50) * 1.18
print(apply_discount(1000, 15))  # 850.0
print(TAX_RATE, shop.__version__)  # 0.18 1.0.0
