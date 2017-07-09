"""Contains everything we need for Registration and Authentication."""

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
                raise ValueError('The given email must be set')

        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user

    def create_user(self, email, password=None):
        return self._create_user(email, password)


class CustomUser(AbstractBaseUser):
    """
    User model class.
    """

    first_name  = models.CharField(max_length=254, blank=True)
    last_name  = models.CharField(max_length=254, blank=True)
    email = models.EmailField(blank=False, unique=True)

    USERNAME_FIELD = 'email'

    objects = CustomUserManager()


    def get_full_name(self):
        """
        Returns the first name + last name with a space in between.
        """

        full_name = '{} {}'.format(self.first_name, self.last_name)
        return full_name

    def update(self, first_name=None, last_name=None):
        """
        Updates user data.
        """

        if first_name:
            self.first_name = first_name
        if last_name:
            self.last_name = last_name

        self.save()

    @staticmethod
    def get_by_id(user_id):
        """
        Get user with given id.
        """

        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return None

        return user


    def to_dict(self):
        """
        Convert model object to dictionary.
        """

        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
        }
