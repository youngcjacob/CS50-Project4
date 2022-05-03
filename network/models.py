from tkinter import CASCADE
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Posts(models.Model):
    content = models.TextField(max_length=280)
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, related_name="Posts")


# class Following(models.Model):
#     user = models.ForeignKey(
#         "User", on_delete=models.CASCADE, related_name="following")
#     follower = models.TextField(max_length=100)


# class Likes(models.Model):
#   post = models.ForeignKey("Posts", on_delete=CASCADE, related_name="Post")
#   user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="Likes")

# class Comments(models.Model):
#     post = post = models.ForeignKey(
#         "Posts", on_delete=CASCADE, related_name="Comments")
#     comment = models.TextField(max_length=280)
