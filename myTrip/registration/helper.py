""" Contains HttpResponse shortcuts."""
from django.http import HttpResponse

# HttpResponse 4xx
response_400_invalid_format = HttpResponse("This email is not valid format.", status=400)
response_400_already_registered = HttpResponse("This email is already registered.", status=400)
response_400_required = HttpResponse("Email and password must be set.", status=400)
response_400_not_logged_in = HttpResponse("You're not logged in.", status=400)
response_403_invalid_credentials = HttpResponse('Email or password invalid', status=403)
response_403_no_such_user = HttpResponse('No such user account', status=403)
response_403_not_activated = HttpResponse('User is not activated', status=403)

# HttpResponse 2xx
response_200_login_successful = HttpResponse("Login successful.", status=200)
response_200_logout_successful = HttpResponse("Logout successful.", status=200)
response_201_successfully_created = HttpResponse("User successfully created.", status=201)
