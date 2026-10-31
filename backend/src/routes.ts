import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { AuthUserController } from "./controllers/user/AuthUserController.js";
import { validateSchema } from "./middlewares/validateSchema.js";
import {
  createUserSchema,
  authUserSchema,
} from "./schemas/createUserSchema.js";
import { DetailUserController } from "./controllers/user/DetailUserController.js";
const router = Router();

// users
router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);

router.post(
  "/session",
  validateSchema(authUserSchema),
  new AuthUserController().handle,
);

router.get("/me", new DetailUserController().handle);

export { router };
