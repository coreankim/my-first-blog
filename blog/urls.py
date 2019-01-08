from django.urls import path
from . import views

urlpatterns = [
    # path('', views.plan_list, name="plan_list"),
    path('', views.base, name="base"),
    path('blog/sidebar/', views.sidebar, name="sidebar"),
    path('blog/<str:Injury_key>/', views.plan_detail, name='plan_detail'),
    # path('blog/plan_detail_toggle/<str:Injury_key>/', views.plan_detail_toggle, name='plan_detail_toggle'),
]