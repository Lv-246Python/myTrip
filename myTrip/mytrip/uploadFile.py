import boto3
from boto3 import Session
from .local_settings import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME, AWS_DEFAULT_REGION


def upload(key, imageToUpload):
    session = boto3.session.Session(
        aws_access_key_id=AWS_ACCESS_KEY,
        aws_secret_access_key=AWS_SECRET_KEY,
        region_name=AWS_DEFAULT_REGION,
        )
    s3 = session.resource('s3')
    s3.Bucket(AWS_BUCKET_NAME).put_object(Key=key, Body=imageToUpload)
    s3 = boto3.client('s3')
    url = '{}/{}/{}'.format(s3.meta.endpoint_url, 'triptracker', key)
    return url