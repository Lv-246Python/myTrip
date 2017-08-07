"""This module contains help model class and basic functions."""

from django.db import models


class Help(models.Model):
    """Help
        :argument id: int - auto generated primary key.
        :argument message: str - body of message.
        :argument email_to: str - email of user who sent feedback.
        :argument create_at: datetime - date and time of created Help object.
        :argument update_at: datetime - date and time of modified Help object.
        """
    subject = models.CharField(max_length=20)
    message = models.TextField()
    email_to = models.EmailField(blank=False)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, editable=True)

    @staticmethod
    def create(subject, message, email_to):
        """This method creates Help object by given arguments.
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
    def all(step=20):
        """Get all Help objects with given step to return last few objects.
        Args:
            step (int): uses to return specified number of objects.
        Returns:
            QuerySet<Help>: QuerySet of Helps or None.
            """
        helps = reversed(Help.objects.all().order_by('-create_at')[:step])
        return helps

    def to_dict(self):
        """Convert model object to dictionary.
                Return:
                    dict:
                        {
                            'id': id,
                            'subject': subject,
                            'message': message,
                            'email_to': email_to,
                            'create_at': date of creation,
                            'update_at': date, when object was last modified
                        }.
                """
        return {
            'id': self.id,
            'subject': self.subject,
            'message': self.message,
            'email_to': self.email_to,
            'create_at': self.create_at,
            'update_at': self.update_at
        }

    def __repr__(self):
        return """id: {}, message: {}, email_to: {},  create_at: {}, update_at: {}""".format(
            self.id, self.message, self.email_to, self.create_at, self.update_at)
