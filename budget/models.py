from django.db import models


class BudgetEntry(models.Model):
    TRANSACTION_TYPES = [
        ('IN', 'Income'),
        ('OUT', 'Expense')
    ]
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    transaction_type = models.CharField(
        max_length=3, choices=TRANSACTION_TYPES)

    def __str__(self):
        return f"{self.transaction_type} - {self.amount} on {self.date}"
