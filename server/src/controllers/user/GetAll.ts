import { prisma } from "@/database/prismaClient"
import { ApiError, NotFoundError } from "@/helpers/api-erros"
import { User } from "@/models/User"

export class GetAll {
  async execute(): Promise<User[]> {
    try {
      const allUsers = await prisma.user.findMany()

      if (!allUsers) {
        throw new NotFoundError("Users not found")
      }

      return allUsers
    } catch (error) {
      throw new ApiError("An unexpected error occurred", 500)
    }
  }
}
