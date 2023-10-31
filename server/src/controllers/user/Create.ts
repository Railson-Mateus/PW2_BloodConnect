import { ValidationError, validate } from "class-validator";

import { BadRequestError } from "@/helpers/api-erros";
import {
  HttpRequest,
  IController,
  ICreateUserService,
} from "@/interfaces/protocols";
import { IUser } from "@/models/User";
import { CreateUserDto } from "@/validators/User";
import { plainToClass } from "class-transformer";
import { SessionService } from "@/services/auth/SessionService";
import { prisma } from "@/database/prismaClient";
import { GenerateToken } from "@/provider/GenerateToken";

export class Create implements IController {
  constructor(private createService: ICreateUserService) {}

  async handle(
    httpRequest: HttpRequest<CreateUserDto>
  ): Promise<{ user: Omit<Required<IUser>, "password">; accessToken: string }> {
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

    const userCreated = await this.createService.execute(newUser);

    const generateToken = new GenerateToken();
    const userId = userCreated.id as string;
    const token = await generateToken.execute(userId);

    return { user: userCreated, accessToken: token };
  }
}
