from django.contrib.auth.models import User
from rest_framework import serializers
from polls.models import Poll, Flow

class FlowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flow
        fields = '__all__'


class PollSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    flow = serializers.ReadOnlyField(source='flow.name')
    class Meta:
        model = Poll
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    polls = serializers.PrimaryKeyRelatedField(many=True, queryset=Poll.objects.all())
    class Meta:
        model = User
        fields = ('id', 'username', 'polls')
