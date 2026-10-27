import type { Request, Response } from "express";
import { CreateUserServices } from "../../services/user/CreateUserService.js";

class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({
          message: "Por favor preencha todos os campos.",
        });
        return;
      }

      const createUserService = new CreateUserServices();
      const user = await createUserService.execute({ name, email, password });

      res.status(200).json(user);
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erro interno do servidor.",
      });
      return;
    }
  }
}

export { CreateUserController };
