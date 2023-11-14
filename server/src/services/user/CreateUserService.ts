import { hash } from "bcrypt";

import { IUser } from "@/models/User";
import { ApiError, ConflictError } from "@/helpers/api-erros";
import { ICreateUserService } from "@/interfaces/protocols";
import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "@/validators/User";

export class CreateUserService implements ICreateUserService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(
    data: CreateUserDto
  ): Promise<Omit<Required<IUser>, "password">> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new ConflictError("User already exists");
    }
    try {
      const hashedPassword = await hash(data.password, 8);
      data.password = hashedPassword;

      const userCreated = await this.prisma.user.create({
        data,
      });

      return userCreated;
    } catch (error) {
      throw new ApiError("User not created", 500);
    }
  }
}
