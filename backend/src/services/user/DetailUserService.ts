import { prisma } from "../../lib/prisma.js";

interface DetailUserProps {
  user_id: string;
}

class DetailUserService {
  async execute({ user_id }: DetailUserProps) {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return user;
  }
}

export { DetailUserService };
