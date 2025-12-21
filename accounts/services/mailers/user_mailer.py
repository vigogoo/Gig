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
            priority='now'
        )

    @staticmethod
    def passwordChangeRequest(user):
        otpObj = UserOTPCodes.generate_code(user)
        msg = ('Hi there, you password reset code is: {0}. \n' 
               'If you did not request this please ignore this email').format(str(otpObj.code))


        mail.send(
            recipients=[user.email],
            subject='Password Change Request',
            message=msg,
            priority='now'
        )
