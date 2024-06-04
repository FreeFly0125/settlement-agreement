import { NextFunction, Request, Response } from "express"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const profile = req.body;
    if (!(profile.name && profile.role)) {
        res.status(400).send({message: "Invalid request"});
    } else {
        next();
    }
}
