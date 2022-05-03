from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

# will need to add additional models for posts, likes, and followers
