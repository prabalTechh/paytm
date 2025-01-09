import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = (req.headers as any).authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.userId = (decoded as any).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
export default authMiddleware;
