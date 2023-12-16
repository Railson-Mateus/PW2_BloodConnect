import { NotFoundError, UnauthorizedError } from "@/helpers/api-erros";
import { prisma } from "../database/prismaClient";
import { Request, Response, NextFunction } from "express";

export function isAdmin() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (!user.isAdmin) {
      throw new UnauthorizedError("User not authorized");
    }

    next();
  };
}
