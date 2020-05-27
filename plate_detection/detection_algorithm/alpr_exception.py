class AlprException(Exception):
    def __init__(self, message):
        super(AlprException, self).__init__(message)