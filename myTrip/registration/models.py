"""Contains everything we need for Registration and Authentication."""

import datetime

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from django.core.validators import validate_email
from django.db import models


class CustomUser(AbstractBaseUser):
    """
    User model.
    :argument id: int - auto generated primary key
    :argument facebook_id: str - user id in facebook
    :argument first_name: str - new user's firstName
    :argument last_name: str - new user's lastName
    :argument email: str - new user's emailAdress
    :argument is_active: boolean - user is activ
    """

    first_name = models.CharField(max_length=254, blank=True, null=True)
    last_name = models.CharField(max_length=254, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    password = models.CharField(max_length=254, blank=False)
    facebook_id = models.CharField(max_length=254, unique=True, blank=True, null=True)
    is_active = models.BooleanField(default=False)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, editable=True)

    USERNAME_FIELD = 'email'
    objects = BaseUserManager()

    @staticmethod
    def create(password, email, first_name=None, last_name=None):
        """
        Creates and saves a User with the given email and password.
        Args:
            email (str): new user's email.
            password (str): new user's password.
            first_name (str): new user's first name.
            last_name (str): new user's last name.
        Returns:
            new CustomUser object.
        """

        user = CustomUser()
        user.email = email
        user.is_active = False
        user.set_password(password)
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        return user

    @staticmethod
    def fb_create(password, facebook_id, first_name=None, last_name=None):
        """
        Creates and saves a User with the given facebook_id and password.
        Args:
            facebook_id(str): user_id in facebook
            password (str): new user's password.
            first_name (str): new user's first name.
            last_name (str): new user's last name.
        Returns:
            new CustomUser object.
        """

        user = CustomUser()
        user.facebook_id = facebook_id
        user.is_active = True
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

    def activate(self):
        """
        Activates user
        Args:
            self: current object.
        """

        self.is_active = True
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

    @staticmethod
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


class HashUser(models.Model):
    """
    Table for finding active users
    :argument hash: str - activation hash for every user
    :argument user: Object<CustomUser>: - foreign key to CustomUser model
    """

    hash = models.CharField(max_length=500, blank=False)
    user = models.OneToOneField(CustomUser, blank=False)
    create_at = models.DateTimeField(auto_now_add=True)

    @staticmethod
    def create(user, hash):
        """
        Creates and saves a User with the given email and password.
        Args:
            user (Object<CustomUser>): new user.
            hash (str): for appropriate user.
        Returns:
           hash_user (Object<HashUser>): new hash-user .
        """

        hash_user = HashUser()
        hash_user.user = user
        hash_user.hash = hash
        hash_user.save()
        return hash_user

    @staticmethod
    def get_user_by_hash(hash):
        """
        Gives user by hash
        Args:
            hash (str): for appropriate user.
        Returns:
           user (Object<CustomUser>): new user.
        """
        try:
            hash_user = HashUser.objects.get(hash=hash)
            return hash_user.user
        except ObjectDoesNotExist:
            return False
