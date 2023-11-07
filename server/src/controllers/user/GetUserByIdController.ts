import { prisma } from "@/database/prismaClient";
import { ApiError, NotFoundError } from "@/helpers/api-erros";
import {
  HttpRequest,
  IController,
  IGetUserByIdService,
} from "@/interfaces/protocols";
import { IUser } from "@/models/User";

type IDeleteUser = {
  id: string;
};

export class GetUserByIdController implements IController {
  constructor(private getUserByIdService: IGetUserByIdService) {}

  async handle(
    httpRequest: HttpRequest<IDeleteUser>
  ): Promise<Omit<Required<IUser>, "password"> | undefined> {
    const { id } = httpRequest.params;
    try {
      const userFound = await this.getUserByIdService.execute(id);
      return userFound;
    } catch (error) {
      console.log(error);
    }
  }
}
