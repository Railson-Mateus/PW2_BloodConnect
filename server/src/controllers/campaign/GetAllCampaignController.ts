import { HttpRequest, IController, IService } from "@/interfaces/protocols";
import { ICampaign } from "@/models/Campaign";

export class GetAllCampaignController implements IController {
  constructor(private getAllCampaignService: IService<unknown, ICampaign[]>) {}

  async handle(): Promise<ICampaign[]> {
    const allCampaign = await this.getAllCampaignService.execute();

    return allCampaign;
  }
}
