from django.contrib.auth.models import User
from rest_framework import serializers
from polls.models import Poll, Flow

class FlowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flow
        fields = '__all__'


class PollSerializer(serializers.ModelSerializer):
    flow = serializers.ReadOnlyField(source='flow.name')
    class Meta:
        model = Poll
        fields = ('id', 'flow', 'statement', 'agree', 'disagree', 'likes', 'dislikes')


class ShortPollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = ('agree_rate', 'rate')


class UserSerializer(serializers.ModelSerializer):
    polls = serializers.PrimaryKeyRelatedField(many=True, queryset=Poll.objects.all())
    class Meta:
        model = User
        fields = ('id', 'username', 'polls')
