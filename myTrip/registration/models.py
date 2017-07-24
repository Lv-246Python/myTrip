"""Contains everything we need for Registration and Authentication."""

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class CustomUser(AbstractBaseUser):
    """
    User model.
    :argument id: int - auto generated primary key
    :argument first_name: str - new user's firstName
    :argument last_name: str - new user's lastName
    :argument email: str - new user's emailAdress
    """

    first_name = models.CharField(max_length=254, blank=True)
    last_name = models.CharField(max_length=254, blank=True)
    email = models.EmailField(unique=True, blank=False)
    password = models.CharField(max_length=254, blank=False)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, editable=True)

    USERNAME_FIELD = 'email'
    objects = BaseUserManager()


    @staticmethod
    def create(email, password):
        """
        Creates and saves a User with the given email and password.
        Args:
            email (str): new user's email.
            password (str): new user's password.
        Returns:
            new CustomUser object.
        """

        user = CustomUser()
        user.email = email.lower()
        user.set_password(password)
        user.save()
        return user

    @staticmethod
    def get_by_id(user_id):
        """
        Get user with given id.
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

    @staticmethod
    def get_by_email(email):
        """
        Check for user with given email. If exist return.
        Args:
            user_email (int): new user's email.
        Returns:
            CustomUser object or None when exception works.
        """

        try:
            user = CustomUser.objects.get(email=email)
            return user
        except CustomUser.DoesNotExist:
            return None

    def get_short_name(self):
        """
        Returns the first name.
        Args:
            self: current object.
        Returns:
            str object.
        """

        short_name = self.first_name
        return short_name

    def get_full_name(self):
        """
        Returns the first name + last name with a space in between.
        Args:
            self: current object.
        Returns:
            str object.
        """

        full_name = '{} {}'.format(self.first_name, self.last_name)
        return full_name

    def update(self, first_name=None, last_name=None):
        """
        Updates user data.
        Args:
            self: current object.
            first_name (str): new user's firstName.
            last_name (str): new user's lastName.
        Returns:
            str object.
        """

        if first_name and not last_name:
            self.first_name = first_name
            return first_name

        elif not first_name and last_name:
            self.last_name = last_name
            return last_name

        elif first_name and last_name:
            self.first_name = first_name
            self.last_name = last_name
            return self.get_full_name()

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
            'create_at': create_at,
            'update_at': update_at
        """

        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'create_at': self.create_at,
            'update_at': self.update_at
        }
