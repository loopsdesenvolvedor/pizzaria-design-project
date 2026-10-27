import "dotenv";
import cors from "cors";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import { router } from "./routes.js";

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use(
  (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      error: "Erro interno do servidor.",
    });
  },
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
