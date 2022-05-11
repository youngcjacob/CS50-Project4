from django.contrib import admin

from network.models import User, Posts, Following

# Register your models here.
admin.site.register(User)
admin.site.register(Posts)
admin.site.register(Following)
