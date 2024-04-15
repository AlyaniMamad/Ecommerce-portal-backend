import express from 'express'
import {registerController,loginController,testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

//create a seprate router object
const router = express.Router();

//routing listed
//Register Router and Method is POST
router.post("/register", registerController)

//Login Router and Method is POST
router.post("/login",loginController)

//Forgot password and method is POST
router.post('/forgot-password',forgotPasswordController)

//testing perpose router
router.get("/test",requireSignIn,isAdmin,testController)

//protected route for the User
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
});

//protected route for the Admin
router.get('/admin-auth', requireSignIn, isAdmin,(req, res) => {
    res.status(200).send({ ok: true })
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController);
export default router;