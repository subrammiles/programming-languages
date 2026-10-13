"""
A decorator that takes arguments needs one more level of functions:
 @retry(times=3)  ->  retry(times=3) returns the real decorator
"""
import functools
import random


def retry(times=3, exceptions=(Exception,)):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    print(f"  attempt {attempt} failed: {e}")
            raise RuntimeError(f"{func.__name__} failed after {times} attempts")

        return wrapper

    return decorator


def require_role(role):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(user, *args, **kwargs):
            if role not in user.get("roles", []):
                raise PermissionError(f"{user['name']} needs role {role!r}")
            return func(user, *args, **kwargs)

        return wrapper

    return decorator


random.seed(3)


@retry(times=5, exceptions=(ConnectionError,))
def flaky_download():
    if random.random() < 0.6:
        raise ConnectionError("network hiccup")
    return "data"


print(flaky_download())


@require_role("admin")
def delete_user(user, target):
    return f"{user['name']} deleted {target}"


print(delete_user({"name": "Asha", "roles": ["admin"]}, "bob"))
try:
    delete_user({"name": "Ravi", "roles": []}, "bob")
except PermissionError as e:
    print("PermissionError:", e)
