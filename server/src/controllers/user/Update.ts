import { hash } from "bcrypt"
import { prisma } from "../../database/prismaClient"
import { ApiError, ConflictError } from "../../helpers/api-erros"
import { User } from "../../models/User"

export class Update {
  async execute(data: User): Promise<User> {
    try {
      const userExists = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      })

      if (userExists) {
        throw new ConflictError("User already exists")
      }

      const hashedPassword = await hash(data.password, 8)
      data.password = hashedPassword

      const userCreated = await prisma.user.create({
        data: data,
      })

      return userCreated
    } catch (error) {
      throw new ApiError("User not created", 500)
    }
  }
}
