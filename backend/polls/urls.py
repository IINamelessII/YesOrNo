from django.conf.urls import url, include
from django.urls import path
from polls import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'polls', views.PollViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'flows', views.FlowViewSet)


urlpatterns = [
    url(r'', include(router.urls)),
    url(r'polls_by_flow/(?P<flow_name>.+)/$', views.PollByFlowNameList.as_view()),
    url(r'shortpoll_by_id/(?P<id>.+)/$', views.ShortPollById.as_view()),
    url(r'polls_by_user/', views.PollByUserList.as_view(), name='polls-by-user'),
]
