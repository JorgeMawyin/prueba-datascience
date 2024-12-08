from django.urls import path
from . import views

urlpatterns = [
    path('indicators/', views.get_indicators, name='get_indicators'),
    path('top-clients/', views.get_top_clients, name='get_top_clients'),
    path('sales-timeline/', views.get_sales_timeline, name='get_sales_timeline'),
    path('categories/', views.get_categories, name='get_categories'),
    path('regions/', views.get_regions, name='get_regions'),
]