import { BadRequestError } from "@/helpers/api-erros";
import { HttpRequest, IController } from "@/interfaces/protocols";
import { SessionService } from "@/services/auth/SessionService";
import { RequestUser } from "@/validators/RequestUser";
import { validate } from "class-validator";

export class SessionController implements IController {
  constructor(private sessionService: SessionService) {}

  async handle(httpRequest: HttpRequest<RequestUser>): Promise<unknown> {
    const { email, password } = httpRequest as RequestUser;

    console.log(email, password);

    const validations = await validate({ email, password });

    if (validations.length) {
      const errors = validations.reduce<string[]>((acc, curr) => {
        if (curr.constraints) {
          return [...acc, ...Object.values(curr.constraints)];
        }
        return acc;
      }, []);

      console.log(errors);

      throw new BadRequestError("Invalid password or email");
    }

    const result = await this.sessionService.execute({ email, password });

    return result;
  }
}
