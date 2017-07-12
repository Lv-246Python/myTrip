"""This module holds backend parts of authorization"""

from registration.models import CustomUser


class CustomUserAuth(object):
    """CustomUser authentication backend."""

    @staticmethod
    def authenticate(username=None, password=None):
        """
        User login method. Using email as username.
        Args:
            username (str): new user's email.
            password (str): new user's password.
        Returns:
            CustomUser object if successfull.
        """

        try:
            user = CustomUser.objects.get(email=username)
            if user.check_password(password):
                return user
        except CustomUser.DoesNotExist:
            return None

    @staticmethod
    def get_user(user_id):
        """
        Get user with given id.
        Used to pass current CustomUser instance to 'is_authenticated' statement.
        Args:
            user_id (int): new user's id.
        Returns:
            CustomUser object or None when exception works.
        """

        try:
            user = CustomUser.objects.get(id=user_id)
            return user
        except CustomUser.DoesNotExist:
            return None
