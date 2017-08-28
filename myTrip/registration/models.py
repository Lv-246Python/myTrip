"""Contains everything we need for Registration and Authentication."""

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db import models


class CustomUser(AbstractBaseUser):
    """
    User model.
    :argument id: int - auto generated primary key
    :argument first_name: str - new user's firstName
    :argument last_name: str - new user's lastName
    :argument email: str - new user's emailAdress
    """

    first_name = models.CharField(max_length=254, blank=True, null=True)
    last_name = models.CharField(max_length=254, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    password = models.CharField(max_length=254, blank=False)
    facebook_id = models.CharField(max_length=254, unique=True, blank=True, null=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, editable=True)

    USERNAME_FIELD = 'email'
    objects = BaseUserManager()

    @staticmethod
    def create(password, email=None, facebook_id=None, first_name=None, last_name=None):
        """
        Creates and saves a User with the given email and password.
        Args:
            email (str): new user's email.
            facebook_id(str): user_id in facebook
            password (str): new user's password.
            first_name (str): new user's first name.
            last_name (str): new user's last name.
        Returns:
            new CustomUser object.
        """

        user = CustomUser()
        user.email = email
        user.facebook_id = facebook_id
        user.set_password(password)
        user.first_name = first_name
        user.last_name = last_name
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
           user_email (str): new user's email.
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

        if self.first_name:
            return self.first_name
        if self.last_name:
            return self.last_name

    def get_full_name(self):
        """
        Returns the first name + last name with a space in between if exists,
        else returns user's email.
        Args:
            self: current object.
        Returns:
            str object.
        """
        if self.first_name and self.last_name:
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

        if first_name:
            self.first_name = first_name
        if last_name:
            self.last_name = last_name
        if first_name and last_name:
            self.first_name = first_name
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

    def email_validation(email):
        """
        Checks if the email is in valid format
        using Django 'email_validation'.
        Args:
            email(str): given email.
        Returns:
            True if email is valid, None if not.
        """
        try:
            validate_email(email)
            return True
        except ValidationError:
            return False

    @staticmethod
    def get_by_facebook_id(facebook_id):
        """
               Checks if the user with such facebook_id is registered
               Args:
                   facebook_id(str): given facebook_id.
               Returns:
                   User if user exists, None if not
               """
        try:
            user = CustomUser.objects.get(facebook_id=facebook_id)
            return user
        except CustomUser.DoesNotExist:
            return None
