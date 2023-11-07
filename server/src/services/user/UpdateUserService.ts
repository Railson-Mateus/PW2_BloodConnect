import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

import { ApiError, NotFoundError } from "@/helpers/api-erros";
import { IUpdateUserService } from "@/interfaces/protocols";
import { IUpdateUser, IUser } from "@/models/User";

export class UpdateUserService implements IUpdateUserService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(
    data: IUpdateUser,
    id: string
  ): Promise<Omit<Required<IUser>, "password">> {
    try {
      const userExist = await this.prisma.user.findUnique({
        where: {
          id,
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
          id,
        },
        data,
      });

      return userUpdated;
    } catch (error) {
      console.log(error.message);

      throw new ApiError("User not updated", 500);
    }
  }
}
