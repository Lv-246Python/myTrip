"""Contains table which we need for user activation"""

from django.db import models
import datetime
import uuid

from registration.models import CustomUser


class HashUser(models.Model):
    """
    Table for finding active users
    :argument hash: str - activation hash for every user
    :argument user: Object<CustomUser>: - foreign key to CustomUser model
    """
    hash = models.CharField(max_length=500, blank=False)
    user = models.OneToOneField(CustomUser, blank=False)
    create_at = models.DateTimeField()#ToDo

    @staticmethod
    def create(user, hash):
        """
        Creates and saves a User with the given email and password.
        Args:
            user (Object<CustomUser>): new user.
        Returns:
           hash (str): for appropriate user.
        """

        hash_user = HashUser()
        hash_user.user = user
        hash_user.hash = hash
        # hash = str(uuid.uuid4()).replace('-','')
        # hash_user.hash = hash
        # hash_user.create_at = datetime.datetime.now()
        hash_user.save()
        return hash

    @staticmethod
    def get_hash(user):
        """
        Gives hash by user
        Args:
            user (Object<CustomUser>): new user.
        Returns:
           hash (str): for appropriate user.
        """

        hash_user = HashUser.objects.get(user=user)
        return hash_user.hash

    @staticmethod
    def get_user_by_hash(hash):
        """
        Gives hash by user
        Args:
            user (Object<CustomUser>): new user.
        Returns:
           hash (str): for appropriate user.
        """
        pass
        # hash_user = HashUser.objects.get(user=user)
        # return hash_user.hash

    @staticmethod
    def activate(hash):
        """
        Activates user.
        Args:
            hash (str) - activation hash for every user
        Returns:
            new CustomUser object.
        """
        hash_user = HashUser.objects.get(hash=hash)
        user = hash_user.user
        hash_user.delete()
        user.is_active = True
        user.save()
        return user

    # @staticmethod
    # def delete_not_active():
    #     dt = datetime.datetime.now() - datetime.timedelta(minutes=15)
    #     users = CustomUser.objects.filter(is_active=False).filter(create_at__gt=dt)
    #     for user in users:
    #         user.delete()
