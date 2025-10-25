const router = require('express').Router(); 
const userController = require('./user.controller');
const {upload, storage} = require('../../utils/multer');
const {registerValidation, changePasswordValidation} = require('./user.validation');
const {secureAPI} = require('../../utils/secure');
const newUpload = upload(storage());

    router.get('/', secureAPI(["admin"]), async (req, res, next) => {
        try {
            const {name, role, page, limit} = req.query;
            const search = {name, role};
            const users = await userController.listAllUsers(search, page, limit);
            res.json({data: users, msg: 'User List Generated Successfully'});
        } 
        catch (e) {
            next(e);
        }
    });

    router.post('/register', newUpload.single('image'), registerValidation, async (req, res, next) => {
        try {
            if (req.file) {
                const image= req.file.path.replace("public","");  // '/uploads/profile.jpg'
                req.body.image = image;
            }
            const result = await userController.register(req.body);
            res.status(200).json({ data: result, msg: 'User registered successfully' });
        } catch (e) {
            next(e);
        }
    });

     router.post('/login', async (req, res, next) => {
        try {
            const result = await userController.login(req.body);
            res.status(200).json({ data: result, msg: 'User logged in successfully' });
        } catch (e) {
            next(e);
        }
    });

    router.post('/verify-email', async (req, res, next) => {
        try {
            console.log(req.body);
            if (!req.body.email || !req.body.token) {
                return next({ status: 400, message: 'Email and token are required' });
            }
            const result = await userController.verifyEmail(req.body);
            res.status(200).json({ data: result, msg: 'Email verified successfully' });
        } catch (e) {
            next(e);
        }
    });


    router.post('/generate-reset-token', async (req, res, next) => {
        try {
            if (!req.body.email) {
                return next({ status: 400, message: 'Email is required' });
            }
            const result = await userController.generateFPToken(req.body.email);
            res.status(200).json({ data: result, msg: 'Password reset token generated successfully' });
        } catch (e) {
            next(e);
        }
    });

    router.post('/verify-password', changePasswordValidation, async (req, res, next) => {
        try {
            if (!req.body.email || !req.body.token || !req.body.newPassword) {
                return next({ status: 400, message: 'Email, token, and new password are required' });
            }
            const result = await userController.verifyFPToken(req.body);
            res.status(200).json({ data: result, msg: 'Password reset successfully' });
        } catch (e) {
            next(e);
        }
    });

    router.put('/change-password', changePasswordValidation, secureAPI(["admin", "user"]), async (req, res, next) => {
        try {
           const result = await userController.changePassword(req.body);
            res.status(200).json({ data: result, msg: 'Password changed successfully' });
        } catch (e) {
            next(e);
        }
    });


     router.put('/reset-password', changePasswordValidation, secureAPI(["admin"]), async (req, res, next) => {
        try {
           const result = await userController.resetPassword(req.body);
            res.status(200).json({ data: result, msg: 'Password changed successfully' });
        } catch (e) {
            next(e);
        }
    });


    router.get('/profile', secureAPI(["admin", "user"]), async (req, res, next) => {
        try {
            const user_Id = req.currentUser; 
            const user = await userController.getProfile(user_Id);
            res.json({data: user, msg: 'User profile fetched successfully'});
        } catch (e) {
            next(e);
        }
    });

      router.get('/:id', secureAPI(["admin", "user"]), async (req, res, next) => {
        try {
            const userId = req.params.id;
            const user = await userController.getbyId(userId);
            res.json({data: user, msg: 'User details fetched successfully'});
        } catch (e) {
            next(e);
        }
    });


     router.patch('/:id/block', secureAPI(["admin"]), async (req, res, next) => {
        try {
            const userId = req.params.id;
            const result = await userController.blockUnblockUser(userId);
            res.json({data: result, msg: 'User blocked/unblocked successfully'});
        } catch (e) {
            next(e);
        }
    });

    router.patch('/:id/roles', secureAPI(["admin"]), async (req, res, next) => {
        try {
            const userId = req.params.id;
            const result = await userController.updateRoles(userId, req.body);
            res.json({data: result, msg: 'User roles updated successfully'});
        } catch (e) {
            next(e);
        }
    });

    router.patch('/resend-token', async (req, res, next) => {
        try {console.log("body",req.body);
            const user_email = req.body.email;
            const result = await userController.resendVerificationToken(user_email);
            res.json({data: result, msg: 'Verification token resent successfully'});
        } catch (e) {
            next(e);
        }
    });

module.exports = router;

