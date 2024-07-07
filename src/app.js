import express from 'express';
import cookieParser from "cookie-parser";
import { userRouter } from './routes/user.routes.js';
import cors from 'cors'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


app.use('/user', userRouter);

export { app };
