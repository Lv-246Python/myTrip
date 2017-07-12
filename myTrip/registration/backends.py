"""This module holds backend parts of authorization"""

from registration.models import CustomUser


class CustomUserAuth(object):
    """Custom user authentication."""

    @staticmethod
    def authenticate(username=None, password=None):
        """
        User login method.
        Args:
            username (str): user's email.
            password (str): user's password.
        Returns:
            user object if successfull.
        """

        try:
            user = CustomUser.objects.get(email=username)
            if user.check_password(password):
                return user
        except CustomUser.DoesNotExist:
            return None
