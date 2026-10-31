import type { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService.js";

class AuthUserController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const authUserService = new AuthUserService();
      const user = await authUserService.execute({ email, password });

      res.status(200).json(user);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Email/password incorretos"
      ) {
        res.status(401).json({
          message: error.message,
        });
        return;
      }
      console.error(error);
      res.status(500).json({
        message: "Erro interno do servidor",
      });
      return;
    }
  }
}

export { AuthUserController };
