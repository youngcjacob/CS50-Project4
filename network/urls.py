
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register")
    # path(get posts)
    # path(create a post)
    # path(update a post)
    # path(like a post)
    # path(return user details)
]
