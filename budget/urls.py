from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BudgetEntryViewSet

router = DefaultRouter()
router.register(r'entries', BudgetEntryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
