import { ValidationError, validate } from "class-validator";

import { BadRequestError } from "@/helpers/api-erros";
import {
  HttpRequest,
  IController,
  ICreateUserService,
} from "@/interfaces/protocols";
import { IUser } from "@/models/User";
import { GenerateToken } from "@/provider/GenerateToken";
import { CreateUserDto } from "@/validators/User";
import { plainToClass } from "class-transformer";
import upload from "@/middlewares/uploadImage";

export class CreateUserController implements IController {
  constructor(private createUserService: ICreateUserService) {}

  async handle(
    httpRequest: HttpRequest<CreateUserDto>
  ): Promise<{ user: Omit<Required<IUser>, "password"> }> {
    const newUser = plainToClass(CreateUserDto, httpRequest);

    newUser.dateOfBirth = new Date(newUser.dateOfBirth);

    const validations: ValidationError[] = await validate(newUser);

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

    const userCreated = await this.createUserService.execute(newUser);

    // const generateToken = new GenerateToken();
    // const userId = userCreated.id as string;
    // const accesstoken = await generateToken.execute(
    //   userId,
    //   userCreated.isAdmin
    // );

    return { user: userCreated };
  }
}
