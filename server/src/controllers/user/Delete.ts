import { prisma } from "../../database/prismaClient"
import { ApiError } from "../../helpers/api-erros"

export class Delete {
  async execute(id: string): Promise<string> {
    try {
      const userDeleted = await prisma.user.delete({
        where: {
          id,
        },
      })

      if (!userDeleted) {
        throw new ApiError("User not found or could not be deleted", 500)
      }
      // Melhorar retorno
      return "User successfully deleted"
    } catch (error) {
      throw new ApiError("An error occurred while deleting the user", 500)
    }
  }
}
