from polls.models import Poll, Flow
from polls.permissions import IsSuperUserOrReadOnly
from polls.serializers import FlowSerializer, PollSerializer, ShortPollSerializer, UserSerializer
from rest_framework import viewsets, generics
from django.contrib.auth.models import User
from django.http import HttpResponse


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
    queryset = Flow.objects.all().order_by('name')
    serializer_class = FlowSerializer
    permission_classes = (IsSuperUserOrReadOnly,)


class PollViewSet(viewsets.ModelViewSet):
    """
    List of polls in system
    """
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    permission_classes = (IsSuperUserOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PollByFlowNameList(generics.ListAPIView):
    serializer_class = PollSerializer

    def get_queryset(self):
        try:
            flow = self.kwargs['flow_name']
            return Poll.objects.filter(flow__name=flow)
        except:
            return HttpResponse(status=404)


class PollByUserList(generics.ListAPIView):
    serializer_class = PollSerializer

    def get_queryset(self):
        try:
            return sorted(Poll.objects.filter(owner=self.request.user), reverse=True, key=lambda x: x.rate)
        except:
            return None


class ShortPollById(generics.RetrieveAPIView):
    serializer_class = ShortPollSerializer

    def get_object(self):
        try:
            id = int(self.kwargs['id'])
            return Poll.objects.get(pk=id)
        except:
            return HttpResponse(status=404)