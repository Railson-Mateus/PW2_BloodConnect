import { prisma } from "@/database/prismaClient"
import { ApiError, NotFoundError } from "@/helpers/api-erros"
import { User } from "@/models/User"

export class GetById {
  async execute(id: string): Promise<User | null> {
    try {
      const userFound = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!userFound) {
        throw new NotFoundError("User not found")
      }

      return userFound
    } catch (error) {
      throw new ApiError("An unexpected error occurred", 500)
    }
  }
}
