import { PrismaClient } from "@prisma/client";

import { ApiError } from "../../helpers/api-erros";

import { IDeleteUserService } from "@/interfaces/protocols";

export class DeleteUserService implements IDeleteUserService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string) {
    try {
      const userDeleted = await this.prisma.user.delete({
        where: {
          id,
        },
      });
      console.log(userDeleted);

      return userDeleted;
    } catch (error) {
      throw new ApiError("An error occurred while deleting the user", 500);
    }
  }
}
