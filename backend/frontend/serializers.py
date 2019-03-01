from rest_framework import serializers
from frontend.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    is_authenticated = serializers.SerializerMethodField()
    message = serializers.SerializerMethodField()

    def get_is_authenticated(self, obj):
        return self.context['request'].user.is_authenticated
    
    def get_message(self, obj):
        return self.context['request'].session.get('message') if not self.context['request'].session.get('message_was_showed') else None

    class Meta:
        model = Profile
        fields = ('username', 'is_authenticated', 'message', 'voted', 'rated')