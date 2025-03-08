from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import BudgetEntry
from .serializers import BudgetEntrySerializer
from django.db.models import Q

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import BudgetEntry
from .serializers import BudgetEntrySerializer
from datetime import timedelta, date
from calendar import monthrange


class BudgetEntryViewSet(viewsets.ModelViewSet):
    queryset = BudgetEntry.objects.all().order_by('date')
    serializer_class = BudgetEntrySerializer

    def get_queryset(self):
        """Apply filters for month and year."""
        queryset = super().get_queryset()
        month = self.request.query_params.get('month')
        year = self.request.query_params.get('year')

        # Filter by month and year if provided
        if month and year:
            queryset = queryset.filter(
                date__month=int(month), date__year=int(year))
        elif year:
            queryset = queryset.filter(date__year=int(year))
        elif month:
            queryset = queryset.filter(date__month=int(month))

        return queryset

    @action(detail=True, methods=['post'])
    def make_recurring(self, request, pk=None):
        """Make an entry recurring for the next X months."""
        try:
            entry = BudgetEntry.objects.get(pk=pk)
        except BudgetEntry.DoesNotExist:
            return Response({"error": "Entry not found."}, status=status.HTTP_404_NOT_FOUND)

        # Get the number of months to repeat from the request
        repeat_months = int(request.data.get('months', 0))
        if repeat_months <= 0:
            return Response({"error": "Invalid number of months."}, status=status.HTTP_400_BAD_REQUEST)

        # Create new entries for each month
        new_entries = []
        for i in range(1, repeat_months + 1):
            new_date = add_months(entry.date, i)
            new_entry = BudgetEntry.objects.create(
                amount=entry.amount,
                date=new_date,
                transaction_type=entry.transaction_type,
                description=entry.description,
                is_recurring=False,  # These are individual entries, not recurring
                recurring_frequency='NONE'
            )
            new_entries.append(new_entry)

        return Response(BudgetEntrySerializer(new_entries, many=True).data, status=status.HTTP_201_CREATED)


def add_months(original_date, months):
    """Add the specified number of months to the given date."""
    month = original_date.month - 1 + months
    year = original_date.year + month // 12
    month = month % 12 + 1
    day = min(original_date.day, monthrange(year, month)[1])
    return original_date.replace(year=year, month=month, day=day)
