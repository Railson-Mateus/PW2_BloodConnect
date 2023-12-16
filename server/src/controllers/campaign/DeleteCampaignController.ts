import { HttpRequest, IController, IService } from "@/interfaces/protocols";
import { ICampaign } from "@/models/Campaign";

export class DeleteCampaignController implements IController {
  constructor(private deleteCampaignService: IService<string, ICampaign>) {}
  async handle(httpRequest: HttpRequest<unknown>): Promise<ICampaign> {
    const { id } = httpRequest.params;

    console.log(id)
    const campaignDeleted = await this.deleteCampaignService.execute(id);

    return campaignDeleted;
  }
}
