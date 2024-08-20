import express, { NextFunction, Request, Response } from "express";
import userRouter from "./routes/user.route";
import { CelebrateError } from "celebrate";
import AppError from "./errors/error";

const app = express();
app.use(express.json());
app.use((error: Error | AppError | CelebrateError, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }
    if (error instanceof CelebrateError) {
        return response.status(400).json({
            status: 'error',
            message: error.details.get('body')?.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: error.message
    })
})

app.use("/api/v1/user", userRouter);


export default app