from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import UserOTPCodes
from django.shortcuts import get_object_or_404

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def validate_password(self, value):
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    def create(self, validated_data):
        base_name = validated_data.get('email', 'user').split("@")[0]
        validated_data['is_active'] = False
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class ActivationSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=6)
    user = serializers.IntegerField()

    def validate(self, data):
        code = data.get('code')
        user = data.get('user')
        if not UserOTPCodes.is_valid(user, code):
            raise serializers.ValidationError({'code': 'OTP code is invalid'})
        return data


class PasswordResetSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=6)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    def validate(self, data):
        code = data.get('code')
        email = data.get('email')
        password = data.get('password')
        password_confirm = data.get('password_confirm')

        if not User.email_exists(email):
            raise serializers.ValidationError({'email': 'User does not exist'})

        user = get_object_or_404(User, email=email)

        if not UserOTPCodes.is_valid(user.pk, code):
            raise serializers.ValidationError({'code': 'OTP code is invalid'})

        if password != password_confirm:
            return serializers.ValidationError({'password': 'Passwords do not match'})

        return data
