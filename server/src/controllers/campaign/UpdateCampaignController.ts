import { ApiError, BadRequestError } from "@/helpers/api-erros";
import { HttpRequest, IController, IService } from "@/interfaces/protocols";
import { ICampaign, IUpdateCampaign } from "@/models/Campaign";
import { UpdateCampaignDto } from "@/validators/Campaign";
import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";

type IRequest = {
  data: IUpdateCampaign;
  id: string;
};

export class UpdateCampaignController implements IController {
  constructor(private updateCampaignService: IService<IRequest, ICampaign>) {}

  async handle(httpRequest: HttpRequest<IUpdateCampaign>): Promise<ICampaign> {
    const { id } = httpRequest.params;
    const camapign = httpRequest.body;

    const data = plainToClass(UpdateCampaignDto, camapign);

    data.startDate = new Date(data.startDate);
    data.endDate = new Date(data.endDate);

    const validations: ValidationError[] = await validate(data);

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

    try {
      const campaignUpdated = await this.updateCampaignService.execute({
        data,
        id,
      });

      return campaignUpdated;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}
