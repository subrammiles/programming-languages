"""
Exception chaining
 raise NewError(...) from original   -> keeps the original as __cause__
 raise NewError(...) from None       -> hides the original
"""
import json


class ConfigError(Exception):
    pass


def load_config(text):
    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        raise ConfigError("config file is not valid JSON") from e


try:
    load_config("{bad json")
except ConfigError as e:
    print(e)  # config file is not valid JSON
    print("caused by:", type(e.__cause__).__name__, "-", e.__cause__)
