TAX_RATE = 0.18


def apply_discount(amount, percent):
    return round(amount * (1 - percent / 100), 2)


def with_tax(amount):
    return round(amount * (1 + TAX_RATE), 2)
