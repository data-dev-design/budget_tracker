from rest_framework import viewsets
from .models import BudgetEntry
from .serializers import BudgetEntrySerializer


class BudgetEntryViewSet(viewsets.ModelViewSet):
    queryset = BudgetEntry.objects.all().order_by('date')
    serializer_class = BudgetEntrySerializer
