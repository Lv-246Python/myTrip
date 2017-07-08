from django.db import models

class Photo(models.Model):
    src = models.CharField(max_length=200)
    user_id = models.IntegerField()

    @staticmethod
    def get_by_id(photo_id):
        try:
            return Photo.objects.get(id=photo_id)
        except Exception:
            return None

    def create(self, src, user_id):
        self.src = src
        self.user_id = user_id
        self.save()


    def update(self, src, user_id):
        self.src = src
        self.user_id = user_id
        self.save()


    def to_dict(self):
        return {
            "id": self.id,
            "src": self.src,
            "user_id": self.user_id,
        }

    def __str__(self):
        return "{} {} ".format(self.src, self.user_id)
