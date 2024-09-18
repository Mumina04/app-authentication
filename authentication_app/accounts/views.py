from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import jwt, datetime


# Create your views here.
class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response({
            'message': 'Login successful',  # Success message
            'user_id': user.id,  # Optionally include the user ID or any other relevant data
        })
        # Set the JWT token as a secure, HttpOnly cookie
        response.set_cookie(key='jwt', value=token, httponly=True)
        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            # Correct 'algorithms' should be a list of algorithms
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)

class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')

        if not email:
            raise AuthenticationFailed('Email is required.')

        user = User.objects.filter(email=email).first()

        if not user:
            raise AuthenticationFailed('User with this email does not exist.')

        # Here you would generate a password reset link, token, etc.
        reset_link = f"http://localhost:8000/reset-password/{user.id}"

        send_mail(
            'Password Reset Request',
            f'Please click the link to reset your password: {reset_link}',
            'noreply@example.com',
            [email],
            fail_silently=False,
        )
        return Response({"message": "Password reset link has been sent."})

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response