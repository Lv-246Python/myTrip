from django.db import models


class Comment(models.Model):
    message = models.TextField()
    user_id = models.IntegerField()
    photo_id = models.IntegerField()
    checkpoint_id = models.IntegerField()
    trip_id = models.IntegerField()

    @staticmethod
    def get_by_id(id):  # method to get one element by his id, uses to views, returns None when exception works
        try:
            return Comment.objects.get(id=id)
        except Exception as error:
            return None

    @staticmethod
    def get_all():  # method to get all objects by its id's uses for views
        return Comment.objects.all()

    def to_dict(self, request=None):  # method rebuilds queryset ot object dictionary for our views
        return {
            'id': self.id,
            'message': self.message,  # returns object, need to return his name
            'user_id': self.user_id,
            'photo_id': self.photo_id,
            'checkpoint_id': self.checkpoint_id,
            'trip_id': self.trip_id
        }

    def create(self, message, user_id, photo_id, checkpoint_id, trip_id):
        self.message = message
        self.user_id = user_id
        self.photo_id = photo_id
        self.checkpoint_id = checkpoint_id
        self.trip_id = trip_id
        self.save()

    def update(self, message, user_id, photo_id, checkpoint_id, trip_id):
        if message:
            self.message = message
        if user_id:
            self.user_id = user_id
        if photo_id:
            self.photo_id = photo_id
        if checkpoint_id:
            self.checkpoint_id = checkpoint_id
        if trip_id:
            self.trip_id = trip_id
        self.save()

    def __str__(self):
        return "{} {} {} {} {}".format(self.message, self.user_id, self.photo_id, self.checkpoint_id, self.trip_id)
