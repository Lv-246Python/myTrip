from django.http import HttpResponse,JsonResponse
from django.shortcuts import render,redirect

from django.views import View
from .models import *
import json



class Trip(View):
	def get(self, request, id=None):
		if id:
			print(id)
			trip = geById(id)
			contex = {
				'id' : trip.id,
				'title' : trip.title,
				'describtion' : trip.describtion,
				'created_at' : trip.created_at,
			}
			return JsonResponse(contex)
		else:
			trips = geAll()
			print(trips)
			contex = []
			for trip in trips:
				contex.append({
				'id' : trip.id,
				'title' : trip.title,
				'describtion' : trip.describtion,
				'created_at' : trip.created_at,
					})
			return JsonResponse(contex,safe=False)

	def post(self, request):
		createTrip(request)
		return redirect('/trip/')

	def put(self,request,id):
		data = json.loads(request.body.decode('utf-8'))
		editTrip(data,id)
		return redirect('/trip/'+id)

	def delete(self,request,id):
		trip = geById(id)
		if trip:
			deleteTrip(id)
			return redirect('/trip/')
		else:
			return HttpResponse(status=404)