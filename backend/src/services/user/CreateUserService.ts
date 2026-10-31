import { prisma } from "../../lib/prisma.js";
import { hash } from "bcryptjs";

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

class CreateUserServices {
  async execute({ name, email, password }: CreateUserProps) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: { email: email },
    });

    if (userAlreadyExists) {
      throw new Error("Usuario já existe!");
    }

    const userHash = await hash(password, 8);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: userHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }
}

export { CreateUserServices };
