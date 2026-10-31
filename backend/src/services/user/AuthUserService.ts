import "dotenv/config";

import { compare } from "bcryptjs";
import { prisma } from "../../lib/prisma.js";
import jwt from "jsonwebtoken";

interface AuthUserProps {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserProps) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Esse usuário não existe!");
    }

    const userMatch = await compare(password, user.password);
    if (!userMatch) {
      throw new Error("Email/password incorretos");
    }

    const token = await jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: "30d",
      },
    );
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    };
  }
}

export { AuthUserService };
