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

from .models import User, Posts, Following, Likes


def index(request):
    page = request.GET.get('page')
    all_posts = Posts.objects.order_by(
        '-timestamp')  # - indicates descending order
    all_posts = Paginator(all_posts, 10)
    posts = all_posts.get_page(page)
    likes = Likes.objects.filter(user=request.user)
    return render(request, "network/index.html", {
        'posts': posts,
        'likes': likes})


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
    user_details = User.objects.filter(id=user)[0]
    username = user_details.username
    page = request.GET.get('page')
    all_posts = Posts.objects.filter(
        user=user).order_by('-timestamp')
    all_posts = Paginator(all_posts, 10)
    posts = all_posts.get_page(page)
    followers = Following.objects.filter(user=user).count()
    following = Following.objects.filter(follower=username).count()
    try:
        follows = Following.objects.filter(
            user=user, follower=request.user)[0].user

    except IndexError:
        follows = False
    likes = Likes.objects.filter(user=request.user)
    return render(request, "network/user.html", {
        'posts': posts,
        'likes': likes,
        "users_page": user_details,
        'follows': follows,
        "followers": followers,
        "following": following})


def likes(post):
    # find if I like a post or not

    # return like_count
    pass


def like_unlike(request):
    # get post's body
    # like_count = Likes.objects.filter(post=post).count()
    # update_count = like_count.update(likes=like_count)

    # will like or unlike a post depending on the request method
    # should work the same as follow/unfollow
    # like_unlike - this will be for the request
    # if like_unlike == like
    # add to liked table
    # else
    # remove from like table
    # update the post count with like.count
    # return new count and use that to update the inner html of the html page without needing to reload the page
    pass


def following(request):
    # gets list of people the user follows
    following = Following.objects.filter(follower=request.user)
    following_list = []
    for follow in following:
        following_list.append(follow.user)

    # gets all posts not created by current user
    all_posts = Posts.objects.exclude(user=request.user).order_by("-timestamp")
    following_posts = []
    for post in all_posts:
        if post.user in following_list:
            following_posts.append(post)

    page = request.GET.get('page')
    all_posts = Paginator(following_posts, 10)
    posts = all_posts.get_page(page)
    likes = Likes.objects.filter(user=request.user)
    return render(request, "network/index.html", {
        'posts': posts,
        'likes': likes,
        'following': True
    })


@csrf_exempt
def follow_unfollow(request):
    data = json.loads(request.body)
    # status = data.get('status')
    following = User.objects.filter(id=data.get('following'))
    fol = following[0]
    print(fol)
    follower = User.objects.filter(id=data.get('follower'))[0]
    # print(status)
    print(following)
    print(request.method)
    if request.method == 'DELETE':
        Following.objects.filter(user=fol, follower=follower.username).delete()
        return JsonResponse({"Message": "Deleted"})

    new_record = Following(user=fol, follower=follower)
    new_record.save()

    return JsonResponse({"Message": "Follower Added"})


@ csrf_exempt
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


# def post_comment(request):
    # add the comment to the post
    # return the list of updated comments

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

    # render(request, 'network/index.html')
    # JsonResponse([posts.serialize() for post in posts], safe=False)
    # grabs all posts and sends them to the client
    # it makes more sense to do the sorting on the client side
