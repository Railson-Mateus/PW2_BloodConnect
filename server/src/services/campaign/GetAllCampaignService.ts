import { ApiError } from "@/helpers/api-erros";
import { IService } from "@/interfaces/protocols";
import { ICampaign } from "@/models/Campaign";
import { PrismaClient } from "@prisma/client";

export class GetAllCampaignService implements IService<unknown, ICampaign[]> {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(): Promise<ICampaign[]> {
    try {
      const campaigns = await this.prisma.campaign.findMany();

      return campaigns;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}
