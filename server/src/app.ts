import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors'
import userRouter from './routes/user.routes';
import dotenv from 'dotenv';
import DBNAME from './Constants';
const app = express();

//configurations
dotenv.config({
    path: './.env'
});
app.use(express.json());
app.use(morgan("dev"));
app.use(
    cors({
     // origin: [process.env.CLIENT_URL!],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

//defining routes
app.use('/api/v1/user', userRouter);

//connect to database
const mongodbConnection = async() => {
    try {
       const connectDB = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`)
        console.log(` MONGODB CONNECTED !! DB HOST: ${connectDB.connection.host}`)
    } catch (error) {
        console.log("MONGODB CONNETCION ERROR : ", error)
        process.exit(1)
    }
}
mongodbConnection()
.then(() => console.log('Database connected successfully.'))
.catch((error) => console.log('Database connection error.', error));


app.get('/', (req, res) => {
    res.send("This is finally worked baby!");
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});