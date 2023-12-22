import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected succedssfully to mongodb ${conn.connection.host}`.random.white)
    } catch (error) {
        console.log(`Error in MongoDB Database is ${error}`.bgRed.white)
    }
};

export default connectDB;