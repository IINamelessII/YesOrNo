from django.shortcuts import render, redirect
from django.core import serializers
from django.contrib import auth
from django.views.decorators.csrf import ensure_csrf_cookie


def index(request, message=None):
    props = {
        'is_auth': request.user.is_authenticated,
        'username': request.user.username
    }
    context = {
        'props': props
    }
    return render(request, 'frontend/index.html', context=context)


def logout(request):
    auth.logout(request)
    return redirect(request.META.get('HTTP_REFERER'))


@ensure_csrf_cookie
def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = auth.authenticate(request, username=username, password=password)
    if user is not None:
        auth.login(request, user)
    return redirect(request.META.get('HTTP_REFERER'))