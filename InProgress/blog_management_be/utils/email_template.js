const giveEmail = (rest, optcode) => {
    return`
    <div style="background-color:#f4f4f7;padding:40px 0;margin:0;font-family:Helvetica,Arial,sans-serif;">
        <table role="presentation" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;">
            <tr>
                <td style="background-color:#4a90e2;padding:20px;text-align:center;color:#ffffff;">
                    <h1 style="margin:0;font-size:24px;">Welcome to Blog App, ${rest.name}!</h1>
                </td>
            </tr>
            <tr>
                <td style="padding:30px;">
                    <p style="font-size:16px;color:#333333;line-height:1.6;">
                        We're thrilled to have you join the <strong>Blog App</strong> community.
                    </p>
                    <p style="font-size:16px;color:#333333;line-height:1.6;">
                        To complete your registration and enable login, please verify your email by using the verification code below:
                    </p>

                    <div style="background-color:#e7f0fe; border:1px solid #4a90e2; color:#4a90e2; font-size:20px; font-weight:bold; padding:15px; text-align:center; border-radius:6px; margin:20px 0;">
                        ${optcode}
                    </div>

                    <p style="font-size:14px;color:#666666;text-align:center;">
                        Enter this code in the app to verify your email and activate your account.
                    </p>
                </td>
            </tr>
            <tr>
                <td style="background-color:#f0f0f0;padding:20px;text-align:center;font-size:12px;color:#888888;">
                    &copy; ${new Date().getFullYear()} Blog App. All rights reserved.
                </td>
            </tr>
        </table>
    </div>
`
}

module.exports = giveEmail;
