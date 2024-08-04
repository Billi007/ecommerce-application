import express from "express";
const app = express();
import dotenv from 'dotenv';
import mongoose from "mongoose";
import DBNAME from "./constants.js";
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import orderRouter from './routes/order.routes.js';
import paymentRouter from './routes/payement.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';
import cors from 'cors';
import NodeCache from 'node-cache';
import morgan from 'morgan';

dotenv.config({
    path: './.env'
});
app.use(express.json());
app.use(morgan("dev"))
app.use(
    cors({
        origin: [process.env.CLIENT_URL!],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);
const PORT = process.env.PORT;
export const nodeCache = new NodeCache();

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
app.get("/test", (req, res) => {
    res.send("API Working with /api/v1");
});

app.use("/api/v1/user", userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/Public', express.static("Public"))
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
