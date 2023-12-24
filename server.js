import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import cors from 'cors'

//configuration 
dotenv.config();


//database connection
connectDB();

const app = express();

//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//All Routes is Listed Here
app.use('/api/v1/auth', authRoutes);

//build a rest api here 
app.get('/', (req, res) => {
    res.send('<h1><center>Welcome to E-Commerce Portal</center></h1>')
})

//add a port
const PORT = process.env.PORT || 8080;

//run our application
app.listen(PORT, () => {
    console.log(`Server is running on the port number : ${PORT}`.bgGreen.white)
});