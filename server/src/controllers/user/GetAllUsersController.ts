import { IController, IGetAllUsersService } from "@/interfaces/protocols";
import { IUser } from "@/models/User";

export class GetAllUsersController implements IController {
  constructor(private getAllUsersServices: IGetAllUsersService) {}

  async handle(): Promise<Omit<Required<IUser[]>, "password">> {
    const allUsers = await this.getAllUsersServices.execute();

    return allUsers;
  }
}
