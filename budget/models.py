from django.db import models


class BudgetEntry(models.Model):
    TRANSACTION_TYPES = [
        ('IN', 'Income'),
        ('OUT', 'Expense')
    ]
    RECURRING_FREQUENCIES = [
        ('NONE', 'None'),
        ('DAILY', 'Daily'),
        ('WEEKLY', 'Weekly'),
        ('MONTHLY', 'Monthly'),
        ('YEARLY', 'Yearly'),
    ]

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    # Specific date (optional for recurring)
    date = models.DateField(null=True, blank=True)
    transaction_type = models.CharField(
        max_length=3, choices=TRANSACTION_TYPES)
    description = models.CharField(max_length=255, blank=True, null=True)

    # Fields for recurring entries
    is_recurring = models.BooleanField(default=False)
    recurring_frequency = models.CharField(
        max_length=10, choices=RECURRING_FREQUENCIES, default='NONE')

    def __str__(self):
        return f"{self.transaction_type} - {self.amount} on {self.date or 'Recurring'}"
