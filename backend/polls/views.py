from polls.models import Poll, Flow
from polls.permissions import IsSuperUserOrReadOnly, IsSuperUserOrOwnerAdnDeleteOnlyObjectOrReadOnly
from polls.serializers import FlowSerializer, PollSerializer, UserSerializer
from rest_framework import viewsets
from django.contrib.auth.models import User


class UserViewSet(viewsets.ModelViewSet):
    """
    List of users in system
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsSuperUserOrReadOnly,)


class FlowViewSet(viewsets.ModelViewSet):
    """
    List of flows in system
    """
    queryset = Flow.objects.all()
    serializer_class = FlowSerializer
    permission_classes = (IsSuperUserOrReadOnly,)


class PollViewSet(viewsets.ModelViewSet):
    """
    List of polls in system
    """
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    permission_classes = (IsSuperUserOrOwnerAdnDeleteOnlyObjectOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
