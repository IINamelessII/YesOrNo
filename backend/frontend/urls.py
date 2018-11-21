from django.urls import path
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
    path('voteLike/', views.rateLike, name='rateLike'),
    path('voteDislike/', views.rateDislike, name='rateDislike'),
    path('unvoteYes/', views.unvoteYes, name='unvoteYes'),
    path('unvoteNo/', views.unvoteNo, name='unvoteNo'),
    path('unvoteLike/', views.unrateLike, name='unrateLike'),
    path('unvoteDislike/', views.unrateDislike, name='unrateDislike'),
    path('switchtoYes/', views.switchtoYes, name='switchtoYes'),
    path('switchtoNo/', views.switchtoNo, name='switchtoNo'),
    path('switchtoLike/', views.switchtoLike, name='switchtoLike'),
    path('switchtoDislike/', views.switchtoDislike, name='switchtoDislike'),
    path('addPoll/', views.addPoll, name='addPoll'),
    url(r'api/profile/', views.ProfileById.as_view())
]
