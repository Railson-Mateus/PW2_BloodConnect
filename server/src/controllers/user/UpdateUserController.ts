import {
  HttpRequest,
  IController,
  IUpdateUserService,
} from "@/interfaces/protocols";
import { UpdateUserDto } from "@/validators/User";
import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { BadRequestError } from "../../helpers/api-erros";
import { IUser } from "../../models/User";

export class UpdateUserController implements IController {
  constructor(private updateUserService: IUpdateUserService) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserDto>
  ): Promise<Omit<Required<IUser>, "password">> {
    const updateUser = plainToClass(UpdateUserDto, httpRequest.body);
    const { id } = httpRequest.params;

    if (updateUser.dateOfBirth)
      updateUser.dateOfBirth = new Date(updateUser.dateOfBirth);

    updateUser.updatedAt = new Date();

    const validations: ValidationError[] = await validate(updateUser);

    const errors = validations
      .map((validationError) =>
        validationError.constraints
          ? Object.values(validationError.constraints)
          : []
      )
      .flat();

    if (errors.length > 0) {
      throw new BadRequestError(errors.join(", "));
    }

    const userUpdated = await this.updateUserService.execute(updateUser, id);

    return userUpdated;
  }
}
