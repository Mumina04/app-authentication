from django.urls import path
from accounts.views import LogoutView, SignupView,  LoginView, UserView, ForgotPasswordView


urlpatterns = [
    # Endpoint posts from views.ForgotPasswordView
    path('forgot-password', ForgotPasswordView.as_view()),
    # Endpoint posts from views.SignupView
    path('signup', SignupView.as_view()),
    # Endpoint posts from views.LoginView
    path('login', LoginView.as_view()),
    # Endpoint posts from views.logout_view
    path('logout', LogoutView.as_view()),
    # Endpoint posts from views.User
    path('user', UserView.as_view()),
]