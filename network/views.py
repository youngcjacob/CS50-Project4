from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
import json
from django.views.decorators.csrf import csrf_exempt
from datetime import date
from django.core import serializers
from django.core.paginator import Paginator

from .models import User, Posts, Following


def index(request):
    page = request.GET.get('page')
    all_posts = Posts.objects.order_by(
        '-timestamp')  # - indicates descending order
    all_posts = Paginator(all_posts, 10)
    posts = all_posts.get_page(page)
    return render(request, "network/index.html", {
        'posts': posts})


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


@csrf_exempt
def create_post(request):
    content = request.POST.get('form_input')
    user = request.user
    add_post = Posts(content=content, user=user)
    add_post.save()
    return HttpResponseRedirect(reverse('index'))


def user_details(request, user):
    # pass in the user
    # pass in the page number
    users_page = user
    page = request.GET.get('page')
    # want to filter to only the users posts
    all_posts = Posts.objects.filter(
        user=user).order_by('-timestamp')
    # ^ indicates descending order
    all_posts = Paginator(all_posts, 10)
    posts = all_posts.get_page(page)
    return render(request, "network/user.html", {
        'posts': posts,
        "users_page": users_page})
    page_number = "test"
    return HttpResponse(user)

# @csrf_exempt
# def get_posts(request, pageNumber):
#     return render(request, "network/index.html", {
#         "page": pageNumber
#     })

    # posts = Posts.objects.all()
    # pag = Paginator(posts, 10)

    # posts = serializers.serialize(
    #     'json', pag.get_page(1))
    # return JsonResponse(posts, safe=False)

    # except:
    #     return JsonResponse({'Message': "Fetch GET failed"})

    # posts = Posts.objects.all().values()
    # posts_list = list(posts)
    # posts_list.reverse()
    # post.serialize() for post in posts

    #render(request, 'network/index.html')
    #JsonResponse([posts.serialize() for post in posts], safe=False)
    # grabs all posts and sends them to the client
    # it makes more sense to do the sorting on the client side


@csrf_exempt
def update_post(request):
    try:
        data = json.loads(request.body)
        original_post = data.get('original')
        updated_post = data.get('updatedContent')
        identifier = data.get('pk')
        post = Posts.objects.filter(id=identifier).update(content=updated_post)
        return JsonResponse({'message': "Update complete"})
    except:
        return JsonResponse({'message': "error"})

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

# def profile(request):

    # will return all the details related to the logged in user
    # need a model that captures who is following who - two columns - user | follower
    # this will include the amount of followers and people they are following
