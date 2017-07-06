from __future__ import unicode_literals

from django.db import models
from datetime import datetime

class Trip(models.Model):
	user_id = models.IntegerField()
	title = models.CharField(max_length = 200)
	describtion = models.TextField()
	created_at = models.DateTimeField(default = datetime.now,blank = True)
	
	def __str__(self):
		return self.title

def geAll():
	trips = Trip.objects.all()
	return trips

def geById(id):
	trip = Trip.objects.get(id=id)
	return trip

# def createTrip(request):
# 	user_id = 1
# 	title = 'testtitel'
# 	describtion = 'test text'
# 	trip = Trip(user_id = user_id, title=title,describtion=describtion)
# 	trip.save()
# 	return

def createTrip(request):
	user_id = request.POST['user_id']
	title = request.POST['title']
	describtion = request.POST['describtion']
	trip = Trip(title=title,describtion=describtion,user_id = user_id)
	trip.save()
	return

def editTrip(data,id):
	trip = Trip.objects.filter(id=id)
	trip.update(title = data['title'],describtion=data['describtion'])
	return

def deleteTrip(id):
	trip = Trip.objects.get(id=id)
	trip.delete()
	return