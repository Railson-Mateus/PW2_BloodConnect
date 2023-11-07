import { PrismaClient } from "@prisma/client";

import { ApiError, NotFoundError } from "@/helpers/api-erros";

import { IUser } from "@/models/User";
import { IGetUserByIdService } from "@/interfaces/protocols";

export class GetUserByIdService implements IGetUserByIdService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(userId: string): Promise<IUser> {
    try {
      const userFound = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userFound) {
        throw new NotFoundError("User not found");
      }

      return userFound;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}
