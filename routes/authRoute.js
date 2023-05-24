import express from 'express';
import { forgotPasswordController, loginController, registerController, testController, updateProfileController } from '../controllers/authControllers.js';
import { requireSignIn, isAdmin, isUser } from '../middleware/authMiddleware.js'



const router = express.Router()


//route for REGITER in authController || POST
router.post('/register', registerController)


//route for login in authController || POST
router.post('/login', loginController)

//forgot password || POST
router.post('/forgot-password', forgotPasswordController)

//test route for protected
router.get("/test", requireSignIn, isAdmin, testController);

//Dashboard protected route
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

router.put('/profile', requireSignIn, updateProfileController)

export default router;