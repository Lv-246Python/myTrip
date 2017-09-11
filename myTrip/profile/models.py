"""Module contain profile model class and methods."""

from django.core.exceptions import ObjectDoesNotExist
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models

from registration.models import CustomUser


class Profile(models.Model):
    """
    Profile
    :argument user: <User's object> - one-to-one relation to User model
    :argument first_name: str - first name of the user
    :argument last_name: str - last name of the user
    :argument avatar: url - avatar source link
    :argument age: int - user age
    :argument gender: str - user gender
    :argument hobbies: str - user hobbies
    :argument facebook: url - facebook profile link
    :argument instagram: url - instagram profile link
    :argument google: url - google profile link
    """
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE,
        primary_key=True,
    )
    avatar = models.URLField(null=True)
    age = models.PositiveIntegerField(null=True)
    gender = models.TextField(null=True)
    hobbies = models.TextField(null=True)
    facebook = models.URLField(null=True)
    instagram = models.URLField(null=True)
    google = models.URLField(null=True)

    @receiver(post_save, sender=CustomUser)
    def create_user_profile(sender, instance, created, **kwargs):
        """
        Create Profile object when CustomUser Object created.
        """
        if created:
            Profile.objects.create(user=instance)

    @staticmethod
    def get_by_id(user_id):
        """
        Get user profile with user_id
        Args:
            user_id (int): id of user.
        Returns:
            Object<Profile>: Object of Profile or None if got exception.
        """
        try:
            return Profile.objects.get(user=user_id)
        except ObjectDoesNotExist:
            return None

    def update(self,
               first_name=None,
               last_name=None,
               avatar=None,
               age=None,
               gender=None,
               hobbies=None,
               facebook=None,
               instagram=None,
               google=None):
        """
        Updates Profile with new name, last name,
        avatar, age, gender, hobbies,facebook link,
        instagram link and google link
         Args:
            first_name (str): first name,
            last_name (str): last name,
            avatar (str): link to avatar.
            age (int): user age,
            gender (str): user gender
            hobbies (str): user hobbies
            facebook (str): facebook link
            instagram (str): instagram link
            google (str): google link
        Returns:
            profile obj
        """
        if first_name:
            self.user.first_name = first_name
        if last_name:
            self.user.last_name = last_name
        if avatar:
            self.avatar = avatar
        if age:
            self.age = age
        if gender:
            self.gender = gender
        if hobbies:
            self.hobbies = hobbies
        if facebook:
            self.facebook = facebook
        if instagram:
            self.instagram = instagram
        if google:
            self.google = google
        self.save()
        return self

    def to_dict(self):
        """Convert model object to dictionary.
        Return:
            dict:
                {
                    'user': user id,
                    'first_name': first name,
                    'last_name': last name,
                    'avatar': avatar link,
                    'age': user age,
                    'gender': user gender,
                    'hobbies': user hobbies,
                    'facebook': facebook profile link,
                    'instagram': instagram profile link,
                    'google': google profile link
                }
        """
        return {
            "email": self.user.email,
            "user": self.user.id,
            "first_name": self.user.first_name,
            "last_name": self.user.last_name,
            "avatar": self.avatar,
            "age": self.age,
            "gender": self.gender,
            "hobbies": self.hobbies,
            "facebook": self.facebook,
            "instagram": self.instagram,
            "google": self.google,
        }
