import { ApiError } from "@/helpers/api-erros";
import { IService } from "@/interfaces/protocols";
import { ICampaign } from "@/models/Campaign";
import { IDonation } from "@/models/Donation";
import { PrismaClient } from "@prisma/client";

export class DeleteCampaignService implements IService<String, ICampaign> {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string): Promise<ICampaign> {
    try {
      const result = await this.prisma.campaign.delete({
        where: { id },
      });

      return result;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}
