from rest_framework import serializers
from frontend.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('voted', 'rated')