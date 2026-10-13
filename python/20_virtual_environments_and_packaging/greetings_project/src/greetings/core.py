def greet(name: str, shout: bool = False) -> str:
    message = f"Hello, {name}!"
    return message.upper() if shout else message
