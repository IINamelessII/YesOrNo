import json
import os
from re import fullmatch
from django.shortcuts import render, redirect
from django.core import serializers
from django.core.mail import EmailMessage
from django.contrib import auth
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.cache import cache_page
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.db import IntegrityError, transaction
from django.views.generic import View
from django.conf import settings
from rest_framework import generics
from polls.models import Poll, Flow
from frontend.serializers import ProfileSerializer
from frontend.models import Profile
from frontend.errors import (IncorrectEmailError, IncorrectPasswordError,
 UserWithThisEmailExistsError, UserWithThisUsernameExistsError)


@ensure_csrf_cookie
def index(request):
    request.session['message_was_showed'] = True
    return render(request, os.path.join(settings.REACT_APP_DIR, 'build', 'index.html'))


@ensure_csrf_cookie
def logout(request):
    try:
        auth.logout(request)
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=200)


@ensure_csrf_cookie
def signin(request):
    # if request.user.is_authenticated:
    #     return HttpResponse(status=409)
    data = json.loads(request.body.decode('utf-8'))
    try:
        username = data['username']
        password = data['password']
    except:
        return HttpResponse(status=404)
    else:
        user = auth.authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request, user)
            message = None
            request.session['message_was_showed'] = True
        else:
            message = "Wrong Username or Password, please try again or reset your Password"
            request.session['message_was_showed'] = False
        request.session['message'] = message
        return HttpResponse(status=200)


@ensure_csrf_cookie
def signup(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        email = data['email']
        username = data['username']
        password = data['password']
    except:
        return HttpResponse(status=404)
    else:
        try:
            if auth.models.User.objects.filter(email=email).exists():
                raise UserWithThisEmailExistsError()
            if auth.models.User.objects.filter(username=username).exists():
                raise UserWithThisUsernameExistsError()
            if len(password) < 8:
                raise IncorrectPasswordError()
            if not fullmatch('[^@]+@[^@]+\.[^@]+', email):
                raise IncorrectEmailError()
            user = auth.models.User.objects.create_user(
                username=username, email=email, password=password, is_active=False)
            if user:
                user.save()
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk)).decode()
                link = "{}://{}/{}/{}/{}/".format(request.scheme, request.get_host(), 'users/validate', uid, token)
                email = EmailMessage('Confirmation of registration in the YesOrNo', 'Greetings, {}!\nFollow the link below to confirm registration of your account.\n{}'.format(username, link), to=[email,])
                email.send()
        except UserWithThisUsernameExistsError:
            message = 'Account with this username already exists'
        except UserWithThisEmailExistsError:
            message = 'Account has already been registered to this email'
        except IncorrectPasswordError:
            message = 'Password must be at least 8 characters'
        except IncorrectEmailError:
            message = 'This email is incorrect'
        except:
            message = 'Something went wrong, please try again'
        else:
            message = 'Please follow the link received in the email to confirm registration of your account'
        request.session['message'] = message
        request.session['message_was_showed'] = False
        return HttpResponse(status=200)


@ensure_csrf_cookie
def activation(request, uidb64=None, token=None):
    if uidb64 is not None and token is not None:
        try:
            uid = urlsafe_base64_decode(uidb64)
            user_model = auth.get_user_model()
            user = user_model.objects.get(pk=uid)
            if default_token_generator.check_token(user, token) and user.is_active == 0:
                user.is_active = True
                user.save()
                auth.login(request, user)
            else:
                raise ValueError()
        except:
            message = 'Sorry, this link is not valid'
        else:
            message = 'Registration successfully completed'
    else:
        message = 'Sorry, this link is not valid'
    request.session['message'] = message
    request.session['message_was_showed'] = False
    return redirect('index')


@ensure_csrf_cookie
def reset_password(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        email = data['email']
    except:
        return HttpResponse(status=404)
    else:
        try:
            user = auth.models.User.objects.get(email=email)
            if not user.is_active:
                raise ValueError()
        except ValueError:
            message = "Please follow the link in the email to complete the registration of your account."
        except:
            message = "Account with this email not found"
        else:
            try:
                token = default_token_generator.make_token(user)
                uemail = urlsafe_base64_encode(force_bytes(user.pk)).decode()
                link = "{}://{}/{}/{}/{}/".format(request.scheme, request.get_host(), 'users/reset', uemail, token)
                email = EmailMessage('Account access recovery in the YesOrNo', 'Greetings, {}!\nFollow the link below to restore access to your account.\n{}\nIf you did not restore access to your account, ignore this email.'.format(\
                    user.username, link), to=[email,])
                email.send()
            except:
                message = 'Something went wrong, please try again'
            else:
                message = "Please follow the link in the email to restore access to your account"
        request.session['message'] = message
        request.session['message_was_showed'] = False
        return HttpResponse(status=200)


@ensure_csrf_cookie
def reset_password_link(request, uemailb64=None, token=None):
    if uemailb64 is not None and token is not None:
        uemail = urlsafe_base64_decode(uemailb64)
        try:
            user_model = auth.get_user_model()
            user = user_model.objects.get(pk=uemail)
            if not default_token_generator.check_token(user, token):
                raise ValueError()
        except:
            message = 'Sorry, this link is not valid'
        else:
            request.session['message'] = None
            request.session['message_was_showed'] = True
            return render(request, os.path.join(settings.REACT_APP_DIR, 'build', 'index.html'))
    else:
        message = 'Sorry, this link is not valid'
    request.session['message'] = message
    request.session['message_was_showed'] = False
    return redirect('index')


@ensure_csrf_cookie
def reset_password_form(request, uemailb64=None, token=None):
    data = json.loads(request.body.decode('utf-8'))
    try:
        password = data['password']
    except:
        return HttpResponse(status=404)
    try:
        if len(password) < 8:
            raise IncorrectPasswordError()
        user_model = auth.get_user_model()
        uemail = urlsafe_base64_decode(uemailb64)
        user = user_model.objects.get(pk=uemail)
        if not user.is_active:
            raise ValueError()
        user.set_password(password)
        user.save()
    except IncorrectPasswordError:
        request.session['message'] = 'Password must be at least 8 characters'
        request.session['message_was_showed'] = False
        return HttpResponse(status=200)
    except ValueError:
        request.session['message'] = 'Please follow the link in the email to complete the registration of your account.'
        request.session['message_was_showed'] = False
        return HttpResponse(status=200)
    else:
        return redirect('index')
    

@ensure_csrf_cookie
# @transaction.atomic
def voteYes(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        profile = Profile.objects.get(user=request.user)
        profile.voteYes(data['id'])
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=204)
    

@ensure_csrf_cookie
# @transaction.atomic
def voteNo(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        profile = Profile.objects.get(user=request.user)
        profile.voteNo(data['id'])
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=204)


@ensure_csrf_cookie
# @transaction.atomic
def rateLike(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        profile = Profile.objects.get(user=request.user)
        profile.rateLike(data['id'])
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=204)


@ensure_csrf_cookie
# @transaction.atomic
def rateDislike(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        profile = Profile.objects.get(user=request.user)
        profile.rateDislike(data['id'])
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=204)


@ensure_csrf_cookie
def addPoll(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        assert len(data['statement']) > 9
        assert len(data['statement']) < 501
        poll = Poll(owner=request.user, flow=Flow.objects.get(name=data['flow']), statement=data['statement'])
        poll.save()
    except:
        return HttpResponse(status=404)
    else:
        return HttpResponse(status=204)


class ProfileById(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get_object(self):
        try:
            return Profile.objects.get(user__id=self.request.user.id)
        except:
            return HttpResponse(status=404)