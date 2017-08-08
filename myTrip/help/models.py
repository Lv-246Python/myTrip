"""This module contains help model class and basic functions."""

from django.db import models


class Help(models.Model):
    """
    Help
        :argument id: int - auto generated primary key.
        :argument message: str - body of message.
        :argument email_to: str - email of user who sent feedback.
        :argument response_message: str - answer to user's email.
        :argument create_at: datetime - date and time of created Help object.
        :argument update_at: datetime - date and time of modified Help object.
    """
    subject = models.CharField(max_length=20)
    message = models.TextField()
    email_to = models.EmailField(blank=False)
    response_message = models.TextField(blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, editable=True)

    @staticmethod
    def create(subject, message, email_to):
        """
        This method creates Help object by given arguments.
        Args:
            subject (str): subject of email.
            message (str): email body.
            email_to (str): user's email, who sent feedback.
        Returns:
            Object<Help>: Object of help.
        """
        help_obj = Help()

        help_obj.subject = subject
        help_obj.message = message
        help_obj.email_to = email_to

        help_obj.save()
        return help_obj

    @staticmethod
    def filter_with_step(start=0, end=20):
        """
        Gets last 20 Help objects with given step to return last few objects.
        Args:
            start (int): uses to set start number of objects.
            end (int):
        Returns:
            QuerySet<Help>: QuerySet of Helps or None.
        """
        helps = reversed(Help.objects.all().order_by('-create_at')[start:end])
        return helps

    @staticmethod
    def filter(email_to=None, create_at=None):
        """
        Gets Help objects by given arguments.
        Args:
            email_to (str): email of user.
            create_at (datetime): date of creation Help object.
        Returns:
            QuerySet<Help>: QuerySet of Help objects or None.
        """
        helps = Help.objects.filter(email_to=email_to, create_at=create_at)
        return helps

    def to_dict(self):
        """
        Convert model object to dictionary.
            Return:
                dict:
                    {
                        'id': id,
                        'subject': subject,
                        'message': message,
                        'email_to': email_to,
                        'response_message': response_message,
                        'create_at': date of creation,
                        'update_at': date, when object was last modified
                    }.
        """
        return {
            'id': self.id,
            'subject': self.subject,
            'message': self.message,
            'email_to': self.email_to,
            'response_message': self.response_message,
            'create_at': self.create_at,
            'update_at': self.update_at
        }

    def __repr__(self):
        return """id: {}, message: {}, email_to: {}, response_message: {}, create_at: {},
        update_at: {}""".format(self.id, self.message, self.email_to, self.response_message,
                                self.create_at, self.update_at)
