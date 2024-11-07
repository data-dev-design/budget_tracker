from rest_framework import serializers
from .models import BudgetEntry


class BudgetEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetEntry
        fields = '__all__'
