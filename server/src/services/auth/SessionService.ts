import { NotFoundError, UnauthorizedError } from "@/helpers/api-erros";
import { IService } from "@/interfaces/protocols";
import { IUser } from "@/models/User";
import { GenerateToken } from "@/provider/GenerateToken";
import { RequestUser } from "@/validators/RequestUser";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

type IResponse = {
  token: string;
  user: IUser;
};

export class SessionService implements IService<RequestUser, IResponse> {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly generateToken: GenerateToken
  ) {}

  async execute(data: RequestUser): Promise<IResponse> {
    const { email, password } = data;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundError("User or Password incorrect!");
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedError("User or Password incorrect!");
    }

    const userId = user.id;
    delete user.password;

    const token = await this.generateToken.execute(userId, user.isAdmin);

    return { token, user };
  }
}
