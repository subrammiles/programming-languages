"""
Special parameters  /  and  *
 def f(pos_only, /, normal, *, kw_only):
 - parameters before / can ONLY be passed by position   (3.8)
 - parameters after  * can ONLY be passed by keyword
Use * to force clear calls like  connect(host, timeout=5)  instead of  connect(host, 5).
"""


def connect(host, port=443, *, timeout=10, retries=3):
    print(f"connect {host}:{port} timeout={timeout} retries={retries}")


connect("example.com", timeout=5)
try:
    connect("example.com", 443, 5)
except TypeError as e:
    print(e)  # connect() takes from 1 to 2 positional arguments but 3 were given


def power(base, exp, /):
    return base ** exp


print(power(2, 10))  # 1024
try:
    power(base=2, exp=10)
except TypeError as e:
    print(e)  # power() got some positional-only arguments passed as keyword arguments...
