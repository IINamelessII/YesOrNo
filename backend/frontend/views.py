import json
import os
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
        else:
            message = "Wrong Username or Password, please try again or reset your Password"
        request.session['message'] = message
        request.session['message_was_showed'] = False
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
                raise ValueError()
            user = auth.models.User.objects.create_user(
                username=username, email=email, password=password, is_active=False)
            if user:
                user.save()
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk)).decode()
                link = "{}://{}/{}/{}/{}".format(request.scheme, request.get_host(), 'users/validate', uid, token)
                email = EmailMessage('Confirmation of registration in the YesOrNo', 'Greetings, {}!\nFollow the link below to confirm registration of your account.\n{}'.format(username, link), to=[email,])
                email.send()
        except IntegrityError:
            message = 'Account with this username already exists'
        except ValueError:
            message = 'Account has already been registered to this email'
        except:
            message = 'Something went wrong, please try again'
        else:
            message = 'Please follow the link received in the email to confirm registration of your account'
        request.session['message'] = message
        request.session['message_was_showed'] = False
        return HttpResponse(status=200)


@ensure_csrf_cookie
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
                link = "{}://{}/{}/{}/{}".format(request.scheme, request.get_host(), 'users/reset', uemail, token)
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
def reset_password_link(request, uemailb64, token):
    if uemailb64 is not None and token is not None:
        uemail = urlsafe_base64_decode(uemailb64)
        try:
            user_model = auth.get_user_model()
            user = user_model.objects.get(pk=uemail)
            if not default_token_generator.check_token(user, token):
                raise ValueError()
            else:
                auth.login(request, user)
        except:
            message = 'Sorry, this link is not valid'
        else:
            request.session['message'] = None
            request.session['message_was_showed'] = True
            return render(request, 'frontend/resetPassForm.html')
    else:
        message = 'Sorry, this link is not valid'
    request.session['message'] = message
    request.session['message_was_showed'] = False
    return redirect('index')


@ensure_csrf_cookie
def reset_password_form(request, uemailb64, token):
    password = request.POST.get('password')
    try:
        user_model = auth.get_user_model()
        uemail = urlsafe_base64_decode(uemailb64)
        user = user_model.objects.get(pk=uemail)
        user.set_password(password)
        user.save()
    except:
        pass
    finally:
        return redirect('index')
    

@ensure_csrf_cookie
@transaction.atomic
def voteYes(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        poll = Poll.objects.get(pk=data['id'])
        profile = Profile.objects.get(user=request.user)
        profile.voteYes(int(poll.id))
        poll.voteYes()
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=204)
    

@ensure_csrf_cookie
@transaction.atomic
def voteNo(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        poll = Poll.objects.get(pk=data['id'])
        profile = Profile.objects.get(user=request.user)
        profile.voteNo(int(poll.id))
        poll.voteNo()
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=204)


@ensure_csrf_cookie
@transaction.atomic
def rateLike(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        poll = Poll.objects.get(pk=data['id'])
        profile = Profile.objects.get(user=request.user)
        profile.rateLike(int(poll.id))
        poll.rateLike()
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=204)


@ensure_csrf_cookie
@transaction.atomic
def rateDislike(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        poll = Poll.objects.get(pk=data['id'])
        profile = Profile.objects.get(user=request.user)
        profile.rateDislike(int(poll.id))
        poll.rateDislike()
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=204)


@ensure_csrf_cookie
@transaction.atomic
def unvoteYes(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        poll = Poll.objects.get(pk=data['id'])
        profile = Profile.objects.get(user=request.user)
        profile.unvoteYes(int(poll.id))
        poll.unvoteYes()
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=204)
    

@ensure_csrf_cookie
@transaction.atomic
def unvoteNo(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        poll = Poll.objects.get(pk=data['id'])
        profile = Profile.objects.get(user=request.user)
        profile.unvoteNo(int(poll.id))
        poll.unvoteNo()
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=204)


@ensure_csrf_cookie
@transaction.atomic
def unrateLike(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        poll = Poll.objects.get(pk=data['id'])
        profile = Profile.objects.get(user=request.user)
        profile.unrateLike(int(poll.id))
        poll.unrateLike()
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=204)


@ensure_csrf_cookie
@transaction.atomic
def unrateDislike(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        poll = Poll.objects.get(pk=data['id'])
        profile = Profile.objects.get(user=request.user)
        profile.unrateDislike(int(poll.id))
        poll.unrateDislike()
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=204)


@ensure_csrf_cookie
@transaction.atomic
def switchtoYes(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        poll = Poll.objects.get(pk=data['id'])
        profile = Profile.objects.get(user=request.user)
        profile.voteYes(int(poll.id))
        poll.unvoteNo()
        poll.voteYes()
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=204)
    

@ensure_csrf_cookie
@transaction.atomic
def switchtoNo(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        poll = Poll.objects.get(pk=data['id'])
        profile = Profile.objects.get(user=request.user)
        profile.voteNo(int(poll.id))
        poll.unvoteYes()
        poll.voteNo()
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=204)


@ensure_csrf_cookie
@transaction.atomic
def switchtoLike(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        poll = Poll.objects.get(pk=data['id'])
        profile = Profile.objects.get(user=request.user)
        profile.rateLike(int(poll.id))
        poll.unrateDislike()
        poll.rateLike()
    except:
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=204)


@ensure_csrf_cookie
@transaction.atomic
def switchtoDislike(request):
    data = json.loads(request.body.decode('utf-8'))
    try:
        poll = Poll.objects.get(pk=data['id'])
        profile = Profile.objects.get(user=request.user)
        profile.rateDislike(int(poll.id))
        poll.unrateLike()
        poll.rateDislike()
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