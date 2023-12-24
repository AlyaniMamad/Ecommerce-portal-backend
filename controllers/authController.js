import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken' 

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

// Method- Post for Login 
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        
        //validation 
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'invalid email or password'
            })
        }
        
        //check user
        const user = await userModel.findOne({ email })
        
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'user not found please make a account'
            })
        }

        const match = await comparePassword(password, user.password)
        
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'invalid password'
                
            })
        }

        //create a token

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login Time',
            error
        });
    }
};

//test controller

export const testController = (req, res) => {
    try {
        res.send("Process Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};


