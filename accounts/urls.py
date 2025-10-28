from django.urls import path
from .views import SignupView, ActivateView
from rest_framework_simplejwt.views import token_obtain_pair, token_refresh

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('activate/', ActivateView.as_view(), name='activate'),
    path('login', token_obtain_pair, name='token_obtain_pair'),
    path('refresh', token_refresh, name='token_refresh'),
]
