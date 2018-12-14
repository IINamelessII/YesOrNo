from django.conf.urls import url
from users import views


urlpatterns = [
    url(r'^admin/login/', views.admin_login, name='admin-login'),
]