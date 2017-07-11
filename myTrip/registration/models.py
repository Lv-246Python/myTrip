"""Contains everything we need for Registration and Authentication."""

from django.db import models
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractBaseUser


class CustomUser(AbstractBaseUser):
    """
     User
     :argument id: int - auto generated primary key
     :argument first_name: str - user's firstName
     :argument last_name: str - user's lastName
     :argument email: str - user's emailAdress
     """

    first_name = models.CharField(max_length=254, blank=True)
    last_name = models.CharField(max_length=254, blank=True)
    email = models.EmailField(unique=True, blank=False)
    password = models.CharField(max_length=254, blank=False)

    USERNAME_FIELD = 'email'

    @staticmethod
    def create(email, password):
        """
        Creates and saves a User with the given email and password.
        Args:
            email (str): user's email.
            password (str): user's password.
        Returns:
            None.
        """

        if not email or not password:
            raise ValueError('The email & password must be set')

        user = CustomUser()
        user.email = email.lower()
        user.set_password(password)
        user.save()

    @staticmethod
    def get_by_id(user_id):
        """
        Get user with given id.
        Args:
            user_id (int): user's id.
        Returns:
            user object or None when exception works.
        """

        try:
            user = CustomUser.objects.get(id=user_id)
            return user
        except CustomUser.DoesNotExist:
            return None

    @staticmethod
    def get_by_email(email):
        """
        Check for user with given email. If exist return.
        Args:
            user_email (int): user's email.
        Returns:
            user object when if exists with given email,
            if no returns True. If given email is not
            valid returns False.
        """

        try:
            validate_email(email)
            try:
                user = CustomUser.objects.get(email=email)
                return user
            except CustomUser.DoesNotExist:
                return True

        except ValidationError:
            return False

    def get_full_name(self):
        """
        Returns the first name + last name with a space in between.
        Args:
            self: current object.
        Returns:
            full_name object.
        """

        full_name = '{} {}'.format(self.first_name, self.last_name)
        return full_name

    def update(self, first_name=None, last_name=None):
        """
        Updates user data.
        Args:
            self: current object.
            first_name (str): user's firstName.
            last_name (str): user's lastName.
        Returns:
            None.
        """

        if first_name:
            self.first_name = first_name
        if last_name:
            self.last_name = last_name

        self.save()

    def to_dict(self):
        """
        Converts model object to dictionary.
        Args:
            self: current object.
        Returns:
            'id': id,
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
        """

        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
        }