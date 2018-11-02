from django.shortcuts import render, redirect
from django.core import serializers
from django.core.mail import EmailMessage
from django.contrib import auth
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.db import IntegrityError
from backend.settings import ALLOWED_HOSTS


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
def signin(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = auth.authenticate(request, username=username, password=password)
    if user is not None:
        auth.login(request, user)
    return redirect(request.META.get('HTTP_REFERER'))


@ensure_csrf_cookie
def signup(request):
    email = request.POST.get('email')
    username = request.POST.get('username')
    password = request.POST.get('password')
    try:
        user = auth.models.User.objects.create_user(
            username=username, email=email, password=password, is_active=False)
    except IntegrityError:
        pass
    if user:
        user.save()
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk)).decode()
        link = "{}:{}/{}/{}/{}".format(ALLOWED_HOSTS[0], request.META['SERVER_PORT'], 'users/validate', uid, token)
        email = EmailMessage('Confirmation of registration in the YesOrNo', 'Greetings, {}!\nFollow the link below to confirm your registration.\n{}'.format(username, link), to=[email,])
        email.send()
    return redirect(request.META.get('HTTP_REFERER'))


def activation(request, uidb64, token):
    if uidb64 is not None and token is not None:
        uid = urlsafe_base64_decode(uidb64)
        try:
            user_model = auth.get_user_model()
            user = user_model.objects.get(pk=uid)
            if default_token_generator.check_token(user, token) and user.is_active == 0:
                user.is_active = True
                user.save()
                auth.login(request, user)
        except:
            pass
    return redirect('index')