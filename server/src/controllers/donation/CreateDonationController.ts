import { BadRequestError } from "@/helpers/api-erros";
import {
  HttpRequest,
  IController,
  ICreateDonationService,
} from "@/interfaces/protocols";
import { IDonation } from "@/models/Donation";
import { CreateDonationDto } from "@/validators/Donation";
import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";

export class CreateDonationController implements IController {
  constructor(private createService: ICreateDonationService) {}

  async handle(
    httpRequest: HttpRequest<CreateDonationDto>
  ): Promise<IDonation> {
    const newDonation = plainToClass(CreateDonationDto, httpRequest);

    newDonation.date = new Date(newDonation.date);
    console.log(newDonation.date);

    const validations: ValidationError[] = await validate(newDonation);

    console.log(validations);

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

    const donationCreated = await this.createService.execute(newDonation);

    return donationCreated;
  }
}
