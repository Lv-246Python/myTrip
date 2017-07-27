"""Module contain profile model class and methods."""

from django.core.exceptions import ObjectDoesNotExist
from django.db import models

from registration.models import CustomUser

class Profile(models.Model):
    """
    Profile
    :argument id: int - auto generated primary key
    :argument user: int - one-to-one relation to User model
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
    age = models.IntegerField(null=True)
    gender = models.TextField(null=True)
    hobbies = models.TextField(null=True)
    facebook = models.URLField(null=True)
    instagram = models.URLField(null=True)
    google = models.URLField(null=True)

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

    def edit(self, data):
        """
        Updates Profile with new avatar, age, gender, hobbies, 
        facebook link, instagram link and google link

         Args:
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
        self.avatar = data['avatar']
        self.age = data['age']
        self.gender = data['gender']
        self.hobbies = data['hobbies']
        self.facebook = data['facebook']
        self.instagram = data['instagram']
        self.google = data['google']
        self.save()
        return True


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
            "user": self.user.id if self.user else None,
            "avatar": self.avatar,
            "age": self.age,
            "gender": self.gender,
            "hobbies": self.hobbies,
            "facebook": self.facebook,
            "instagram": self.instagram,
            "google": self.google,
        }

