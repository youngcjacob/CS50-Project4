from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import User


def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

# def get_posts(request):
    # grabs all posts and sends them to the client
    # it makes more sense to do the sorting on the client side

# def new_post(request):
    # add a new post to the posts model
    # return a Json response with the new list which will refresh and show the new post below

# def update_posts(request):
    # find the existing post in the post model and update the post content with whatever was sent over

# def like_post(request):
    # increment the like count in the posts model
    # return the new number of liked posts to be rendered in the webpage

# def post_comment(request):
    # add the comment to the post
    # return the list of updated comments

# def follow_unfollow(request):
    # allows users to unfollow people
    # will remove the record from the following model

# def user_details(request):
    # will return all the details related to the logged in user
    # need a model that captures who is following who - two columns - user | follower
    # this will include the amount of followers and people they are following
