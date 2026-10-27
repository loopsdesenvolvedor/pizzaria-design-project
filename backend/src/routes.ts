import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { validateSchema } from "./middlewares/validateSchema.js";
import { createUserSchema } from "./schemas/createUserSchema.js";
const router = Router();

router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);

export { router };
