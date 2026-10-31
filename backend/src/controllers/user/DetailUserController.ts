import type { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService.js";

class DetailUserController {
  async handle(req: Request, res: Response) {
    try {
      const { user_id } = req.body;
      const detailUserController = new DetailUserService();
      const user = await detailUserController.execute({ user_id });

      res.status(200).json(user);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Usuário não encontrado."
      ) {
        res.status(409).json({
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

export { DetailUserController };
