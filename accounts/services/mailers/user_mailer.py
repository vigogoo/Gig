from post_office import mail
from accounts.models import UserOTPCodes


class UserMailer:

    @staticmethod
    def activationCode(user):
        otpObj = UserOTPCodes.generate_code(user)
        msg = 'Hi there, you activation code is: {0}'.format(str(otpObj.code))
        mail.send(
            recipients=[user.email],
            subject='Welcome To Gig',
            message=msg,
            context={'user': user},
            priority='now'
        )

    # @staticmethod
    # def password_changed(user):
    #     mail.send(
    #         recipients=[user.email],
    #         subject="Your password was changed",
    #         template="password_changed.html",
    #         context={"user": user},
    #         priority="medium"
    #     )
