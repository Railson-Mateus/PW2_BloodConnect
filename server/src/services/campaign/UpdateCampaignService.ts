import { PrismaClient } from "@prisma/client";

import { ApiError, NotFoundError } from "@/helpers/api-erros";
import { IService } from "@/interfaces/protocols";
import { ICampaign, IUpdateCampaign } from "@/models/Campaign";

type IRequest = {
  data: IUpdateCampaign;
  id: string;
};

export class UpdateCampaignService implements IService<IRequest, ICampaign> {
  constructor(private readonly prisma: PrismaClient) {}

  async execute({ data, id }: IRequest): Promise<ICampaign> {
    try {
      const campaignExist = await this.prisma.campaign.findUnique({
        where: {
          id,
        },
      });

      if (!campaignExist) {
        throw new NotFoundError("Campaign not exists");
      }

      const campaignUpdated = await this.prisma.campaign.update({
        where: {
          id,
        },
        data,
      });

      return campaignUpdated;
    } catch (error) {
      console.log(error.message);

      throw new ApiError("Campaign not updated", 500);
    }
  }
}
