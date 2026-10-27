import { prisma } from "../../lib/prisma.js";
import { hash } from "bcryptjs";

interface CreateUserServicesProps {
  name: string;
  email: string;
  password: string;
}

class CreateUserServices {
  async execute({ name, email, password }: CreateUserServicesProps) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: { email: email },
    });

    if (userAlreadyExists) {
      throw new Error("Usuario já existe!");
    }

    const userMatch = await hash(password, 8);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: userMatch,
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
