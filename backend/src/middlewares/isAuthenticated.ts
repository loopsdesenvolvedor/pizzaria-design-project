import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res.status(401).json({
      message: "Token não fornecido",
    });
    return;
  }
  const [, token] = authToken.split(" ");

  try {
    const { sub } = jwt.verify(
      token!,
      process.env.JWT_SECRET as string,
    ) as Payload;

    req.user_id = sub;

    return next();
  } catch (error) {
    res.status(401).json({
      error: "Token inválido",
    });
  }

  next();
}
