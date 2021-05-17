import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const authMiddleware = (withToken:boolean) => {
  return (req: Request, res: Response, next: NextFunction): void => {
  
    if(!withToken) {
        return next();
    }
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(401);
      req.user = user;
      console.log(user)
      next();
    });
  }
};
