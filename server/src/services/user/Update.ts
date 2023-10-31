import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

import { prisma } from "@/database/prismaClient";
import { ApiError, NotFoundError } from "@/helpers/api-erros";
import { IUpdateUser, IUser } from "@/models/User";
import { IUpdateUserService } from "@/interfaces/protocols";

export class Update implements IUpdateUserService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(data: IUpdateUser): Promise<IUser> {
    try {
      const userExist = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!userExist) {
        throw new NotFoundError("User not exists");
      }

      if (data.password) {
        data.password = await hash(data.password, 10);
      }

      const userUpdated = await this.prisma.user.update({
        where: {
          email: data.email,
        },
        data,
      });

      return userUpdated;
    } catch (error) {
      throw new ApiError("User not updated", 500);
    }
  }
}
