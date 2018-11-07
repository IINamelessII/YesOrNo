from polls.models import Poll, Flow
from polls.permissions import IsSuperUserOrReadOnly, IsSuperUserOrOwnerAdnDeleteOnlyObjectOrReadOnly
from polls.serializers import FlowSerializer, PollSerializer, UserSerializer
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
    permission_classes = (IsSuperUserOrOwnerAdnDeleteOnlyObjectOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PollByFlowNameList(generics.ListAPIView):
    serializer_class = PollSerializer

    def get_queryset(self):
        try:
            flow = self.kwargs['flow_name']
            return sorted(Poll.objects.filter(flow__name=flow), reverse=True, key=lambda x: x.rate)
        except:
            return HttpResponse(status=404)

