from accounts.services.mailers.user_mailer import UserMailer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignupSerializer, ActivationSerializer, PasswordResetSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserOTPCodes
from accounts.services.mailers import UserMailer
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

User = get_user_model()


class SignupView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            UserMailer.activationCode(user)
            # refresh = RefreshToken.for_user(user)
            # access_token = refresh.access_token

            return Response({
                'result': 'success',
                'user': SignupSerializer(user).data,
                # 'token': {
                #     'access': str(access_token),
                #     'refresh': str(refresh),
                # },
            },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ActivateView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = ActivationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user_id = serializer.validated_data.get('user')
        code = serializer.validated_data.get('code')
        UserOTPCodes.use_otp(user_id, code)
        user = get_object_or_404(User, pk=user_id)
        user.is_active = True
        user.save()
        return Response({'result': 'success'}, status=status.HTTP_200_OK)


class ResetPasswordView(APIView):
    authentication_classes = []
    permission_classes = []


    def get(self, request):
        email = request.data.get('email')
        if not User.email_exists(email):
            return Response({'result': 'error'}, status=status.HTTP_404_NOT_FOUND)

        UserMailer.passwordChangeRequest(user)
        return Response({'result': 'success'}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        password = serializer.validated_data.get('password')
        email = serializer.validated_data.get('email')

        user = get_object_or_404(User, email=email)
        user.set_password(password)
        user.save()
        return Response({'result': 'success'}, status=status.HTTP_200_OK)
