FROM python:3.6
ADD . /myTrip
WORKDIR /myTrip
RUN  pip install -r requirements.txt
