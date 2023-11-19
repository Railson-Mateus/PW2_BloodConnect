import { ApiError } from "@/helpers/api-erros";
import { IService } from "@/interfaces/protocols";
import { ICampaign } from "@/models/Campaign";
import { PrismaClient } from "@prisma/client";

export class CreateCampaignService implements IService<ICampaign, ICampaign> {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(data: ICampaign): Promise<ICampaign> {
    try {
      const result = await this.prisma.campaign.create({
        data,
      });

      return result;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}
