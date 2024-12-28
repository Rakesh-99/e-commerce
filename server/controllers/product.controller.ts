import { NextFunction, Request, Response } from 'express';
import asyncErrorHandler from 'express-async-handler';


// Add product : 
export const addProduct = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {

    const file = req.file;
    const { title, description, ratings, category, color } = req.body;

})