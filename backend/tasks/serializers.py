from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    deadline = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False)
    status_emoji = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = '__all__'  # Includes all fields plus the computed 'status_emoji'

    def get_status_emoji(self, obj):
        return "✅ Completed" if obj.completed else "❌ Pending"
