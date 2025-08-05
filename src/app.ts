import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import httpStatus from 'http-status';
import sendResponse from './app/utils/sendResponse';
import router from './app/router';
import AppError from './app/error/appError';


const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api",router)

app.get('/', (req: Request, res: Response) => {
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Hello world."
  })
});

//Not found route handler
app.use((req, res, next) => {
  next(new AppError(httpStatus.NOT_FOUND,`Route ${req.originalUrl} not found.`));
});

//Global error Handler
app.use(globalErrorHandler);

export default app;