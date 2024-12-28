import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 8090;
import connectDB from './database/dbConfig';
import userRouter from './routes/user.routes';
import errorHandlerMiddleware from './middlewares/errorHandlerMIddleware';
import cookieParser from 'cookie-parser';
import productRoute from './routes/product.routes';
connectDB(process.env.DB_URI!);


// cors config : 
const corsConfig = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ["Content-type", "Authorization"]
}


//Middlewares :
app.use(cors(corsConfig))
app.use(express());
app.use(express.json());
app.use(cookieParser());
app.use('/user/api', userRouter);
app.use("/product/api", productRoute);
app.use(errorHandlerMiddleware);




app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:/${PORT}`);
});



