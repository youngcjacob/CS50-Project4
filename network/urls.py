
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create", views.create_post, name="create"),
    # path("get-posts/<int:pageNumber>", views.get_posts, name="get-posts"),
    path("update", views.update_post, name="update"),
    path("user/<int:user>", views.user_details, name="user_details")

]
