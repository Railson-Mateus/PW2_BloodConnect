import {
  HttpRequest,
  IController,
  IDeleteUserService,
} from "@/interfaces/protocols";
import { prisma } from "../../database/prismaClient";
import { ApiError } from "../../helpers/api-erros";

type IDeleteUser = {
  userId: string;
};

export class DeleteUserController implements IController {
  constructor(private deleteUserService: IDeleteUserService) {}

  async handle(httpRequest: HttpRequest<IDeleteUser>): Promise<unknown> {
    const { id } = httpRequest.params;

    const userDeleted = await this.deleteUserService.execute(id);

    return userDeleted;
  }
}
