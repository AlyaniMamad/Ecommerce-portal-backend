import { hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js'

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        //add some validation over here
        if (!name) {
            return res.send({error:'Name Must be Required'})
        }if (!email) {
            return res.send({error:'Email Must be Required'})
        }if (!password) {
            return res.send({error:'password Must be Required'})
        }if (!phone) {
            return res.send({error:'phone Must be Required'})
        }if (!address) {
            return res.send({error:'address Must be Required'})
        }

        const existingUser = await userModel.findOne({ email });
        
        //check if user already login (existing user)
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Alredy Register so Login Now',
                error
            })
        }

        //register user (New user)
        const hashedPassword = await hashPassword(password)

        //to save this password
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save();

        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Register Form',
            error
        })
    }
};

// export default { registerController };