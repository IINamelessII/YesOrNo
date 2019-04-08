class UserWithThisEmailExistsError(Exception):
    pass


class UserWithThisUsernameExistsError(Exception):
    pass


class IncorrectEmailError(Exception):
    pass


class IncorrectPasswordError(Exception):
    pass