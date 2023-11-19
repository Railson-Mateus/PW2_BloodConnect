import { HttpRequest, IController, IService } from "@/interfaces/protocols";
import { CreateCampaignDto } from "../../validators/Campaign";
import { ICampaign } from "@/models/Campaign";
import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { BadRequestError } from "@/helpers/api-erros";

export class CreateCampaignController implements IController {
  constructor(private createCampaignService: IService<ICampaign, ICampaign>) {}

  async handle(
    httpRequest: HttpRequest<CreateCampaignDto>
  ): Promise<ICampaign> {
    const newCampaign = plainToClass(CreateCampaignDto, httpRequest);

    newCampaign.startDate = new Date(newCampaign.startDate);
    newCampaign.endDate = new Date(newCampaign.endDate);

    const validations: ValidationError[] = await validate(newCampaign);

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

    const campaignCreated = await this.createCampaignService.execute(
      newCampaign
    );

    return campaignCreated;
  }
}
