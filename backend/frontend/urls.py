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
]
