"""Module handle upload to Amazon s3 service."""

import boto3 #pylint: disable=unused-import

try:
    from .local_settings import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME, AWS_DEFAULT_REGION
except ImportError:
    pass

MAX_IMAGE_SIZE = 2*1024*1024
ACCEPTED_IMAGE_TYPE = ['image/png', 'image/jpeg', 'image/svg+xml']


def upload(key, imageToUpload):
    """Upload
        :argument key: <str> - filename
        :argument imageToUpload: <file> - file to upload
    """
    session = boto3.session.Session(
        aws_access_key_id=AWS_ACCESS_KEY, #pylint: disable=undefined-variable
        aws_secret_access_key=AWS_SECRET_KEY, #pylint: disable=undefined-variable
        region_name=AWS_DEFAULT_REGION, #pylint: disable=undefined-variable
        )
    s3 = session.resource('s3')
    s3.Bucket(AWS_BUCKET_NAME).put_object(Key=key, Body=imageToUpload, ACL='public-read') #pylint: disable=undefined-variable
    url = 'https://{}.s3.amazonaws.com/{}'.format(AWS_BUCKET_NAME, key) #pylint: disable=undefined-variable
    return url


def imageValidator(image):
    """Check image size and type
        If valid: returns image."""
    if image:
        if image.size < MAX_IMAGE_SIZE and image.content_type in ACCEPTED_IMAGE_TYPE:
            return True
    return False
