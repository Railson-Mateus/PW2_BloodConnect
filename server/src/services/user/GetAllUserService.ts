import { PrismaClient } from "@prisma/client";

import { ApiError, NotFoundError } from "@/helpers/api-erros";

import { IGetAllUserService } from "@/interfaces/protocols";
import { IUser } from "@/models/User";

export class GetAllUserService implements IGetAllUserService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(): Promise<Omit<Required<IUser[]>, "password">> {
    try {
      const allUsers = await this.prisma.user.findMany();

      return allUsers;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}
