from django.db import models
import traceback

class Checkpoint(models.Model):
    longitude = models.FloatField()
    latitude = models.FloatField()
    title = models.CharField(max_length=20)
    description = models.TextField()
    position_number = models.IntegerField()
    source_url = models.URLField()
    trip_id = models.IntegerField()

    def to_dict(self):
        return {
            "longitude": self.longitude,
            "latitude": self.latitude,
            "title": self.title,
            "description": self.description,
            "source_url": self.source_url,
            "position_number": self.position_number,
            "trip_id": self.trip_id
        }

    @staticmethod
    def post(data):
        try:
            new_object = Checkpoint(**data)
            new_object.save()
            return True
        except:
            return False

    @staticmethod
    def get_all():
        return Checkpoint.objects.all()

    @staticmethod
    def get_by_id(checkpoint_id):
        try:
            return Checkpoint.objects.get(id = checkpoint_id)
        except:
            return None

    def put(self,data):
        attributes = ['longitude', 'latitude', 'title', 'description', 'position_number', 'source_url', 'trip_id']
        for attribute in data.keys():
            if attribute in attributes:
                setattr(self,attribute,data[attribute])
        try:
            self.save()
            return True
        except:
            return False

    def delete_checkpoint(self):
        try:
            self.delete()
            return True
        except:
            return False