from django.conf.urls import url, include
from django.urls import path
from polls import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'polls', views.PollViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'flows', views.FlowViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url(r'', include(router.urls)),
    url(r'polls_by_flow/(?P<flow_name>.+)/$', views.PollByFlowNameList.as_view()),
]
