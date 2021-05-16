import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { Routes } from "../routes";

export const authToken = (req: Request, res: Response, next: NextFunction): void => {
  const path = req.originalUrl.replace(/\?.*$/, "");
  if (
    Routes.filter((r) => r.noToken)
      .map((r) => r.route)
      .includes(path)
  )  return next();
   

  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user(user);
    next();
  });
};
