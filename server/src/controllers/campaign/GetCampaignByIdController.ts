import { HttpRequest, IController, IService } from "@/interfaces/protocols";
import { ICampaign } from "@/models/Campaign";

export class GetCampaignByIdController implements IController {
  constructor(
    private getCampaignByIdService: IService<String, ICampaign | null>
  ) {}

  async handle(httpRequest: HttpRequest<unknown>): Promise<ICampaign | null> {
    const { id } = httpRequest.params;

    const campaign = await this.getCampaignByIdService.execute(id);

    return campaign;
  }
}
