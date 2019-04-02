from django.urls import path, re_path
from django.conf.urls import url
from frontend import views

urlpatterns = [
    path('', views.index, name='index'),
    path('logout/', views.logout, name='logout'),
    path('signin/', views.signin, name='signin'),
    path('signup/', views.signup, name='signup'),
    path('resetpassword/', views.reset_password, name='reset_password'),
    url(r'^users/validate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    views.activation, name='user_activation_link'),
    url(r'^users/reset/(?P<uemailb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    views.reset_password_link, name='reset_password_link'),
    url(r'^users/reset/(?P<uemailb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/form/$', views.reset_password_form, name='reset_password_form'),
    path('voteYes/', views.voteYes, name='voteYes'),
    path('voteNo/', views.voteNo, name='voteNo'),
    path('rateLike/', views.rateLike, name='rateLike'),
    path('rateDislike/', views.rateDislike, name='rateDislike'),
    path('addPoll/', views.addPoll, name='addPoll'),
    url(r'api/profile/', views.ProfileById.as_view())
]

#Urls for React routing
urlpatterns += [path(url, views.index) for url in ('home', 'polls', 'user/signin', 'user/signup', 'user/resetPassword')]
urlpatterns += [re_path(r'polls/[0-9A-Za-z_\-]+', views.index)]