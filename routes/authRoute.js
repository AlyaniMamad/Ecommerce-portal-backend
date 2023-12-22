import express from 'express'
import {registerController} from '../controllers/authController.js'

//create a seprate router object
const router = express.Router();

//routing listed
//Register Router and Method is POST
router.post('/register',registerController)

export default router;