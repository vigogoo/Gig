from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from .utils import generate_6_digit
from django.utils.text import slugify
from django.utils import timezone
import re
import datetime


class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Email is required')

        email = self.normalize_email(email)

        if not extra_fields.get('username'):
            extra_fields['username'] = self.model.generate_username_from_email(email)

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    bio = models.TextField(max_length=25, blank=True)
    profile_pic = models.ImageField(null=True, blank=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=260, unique=False, blank=True, null=True)

    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.generate_username_from_email(self.email)
        super().save(*args, **kwargs)

    @classmethod
    def generate_username_from_email(cls, prefix: str) -> str:
        base_username = slugify(prefix.split('@')[0])
        latest_user = cls.objects.filter(username__startswith=base_username).order_by('-id').first()

        if not latest_user:
            return base_username

        match = re.match(rf'^{re.escape(base_username)}(\d+)?$', latest_user.username)
        if match and match.group(1):
            new_number = int(match.group(1)) + 1
            return f"{base_username}{new_number}"

        return f"{base_username}1"

    def __str__(self):
        return self.email + " " + self.bio


class UserOTPCodes(models.Model):
    code = models.CharField(max_length=6, unique=False, null=False, db_index=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    valid_to = models.DateTimeField(null=True, blank=True, db_index=True)
    inserted_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False, db_index=True)

    @classmethod
    def generate_code(cls, user):
        now = timezone.now()
        new_code = generate_6_digit()
        valid_to = now + datetime.timedelta(minutes=30)

        otp_obj, created = cls.objects.update_or_create(
            user=user,
            defaults={
                'code': new_code,
                'valid_to': valid_to,
                'is_used': False,
            }
        )
        return otp_obj

    @classmethod
    def use_otp(cls, user, code):
        otp_obj = cls.objects.filter(
            user=user,
            code=code,
            is_used=False,
            valid_to__gte=timezone.now()
        ).first()
        if otp_obj:
            otp_obj.is_used = True
            otp_obj.save(update_fields=['is_used'])
            return True
        return False

    @classmethod
    def is_valid(cls, user, code):
        if not code:
            return False

        return cls.objects.filter(
            user=user,
            code=code,
            is_used=False,
            valid_to__gte=timezone.now()
        ).exists()
