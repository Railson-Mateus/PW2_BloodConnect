import { NotFoundError, UnauthorizedError } from "@/helpers/api-errors"
import { prisma } from "../database/prismaClient"
import { Request, Response, NextFunction } from "express"

export function is(rolesRoutes: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new NotFoundError("User not found")
    }

    if (user.role === rolesRoutes) {
      throw new UnauthorizedError("User not authorized")
    }

    next()
  }
}
