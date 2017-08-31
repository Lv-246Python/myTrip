"""Module handle upload to Amazon s3 service."""

import boto3 #pylint: disable=unused-import

# from .local_settings import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME, AWS_DEFAULT_REGION


def upload(key, imageToUpload):
    """Upload
        :argument key: <str> - filename
        :argument imageToUpload: <file> - file to upload
    """
    session = boto3.session.Session(
        aws_access_key_id=AWS_ACCESS_KEY,
        aws_secret_access_key=AWS_SECRET_KEY,
        region_name=AWS_DEFAULT_REGION,
        )
    s3 = session.resource('s3')
    s3.Bucket(AWS_BUCKET_NAME).put_object(Key=key, Body=imageToUpload, ACL='public-read')
    url = 'https://{}.s3.amazonaws.com/{}'.format(AWS_BUCKET_NAME, key)
    return url
