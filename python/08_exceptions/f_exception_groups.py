"""
Exception groups and except*  (Python 3.11)
Raise several unrelated errors at once, e.g. from parallel tasks or validation.
 ExceptionGroup("message", [error1, error2])
 except* SomeType  -> handles the matching errors in the group; the rest carry on
"""


def validate(user):
    errors = []
    if not user.get("name"):
        errors.append(ValueError("name is required"))
    if "@" not in user.get("email", ""):
        errors.append(ValueError("email is invalid"))
    if not isinstance(user.get("age"), int):
        errors.append(TypeError("age must be an int"))
    if errors:
        raise ExceptionGroup("invalid user", errors)


try:
    validate({"name": "", "email": "nope", "age": "x"})
except* ValueError as group:
    for e in group.exceptions:
        print("value problem:", e)
except* TypeError as group:
    for e in group.exceptions:
        print("type problem:", e)
# value problem: name is required
# value problem: email is invalid
# type problem: age must be an int
