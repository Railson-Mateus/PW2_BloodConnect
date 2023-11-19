import { ApiError } from "@/helpers/api-erros";
import { IService } from "@/interfaces/protocols";
import { ICampaign } from "@/models/Campaign";
import { PrismaClient } from "@prisma/client";

export class GetCampaignByIdService
  implements IService<String, ICampaign | null>
{
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string): Promise<ICampaign | null> {
    try {
      const campaign = await this.prisma.campaign.findUnique({
        where: {
          id,
        },
      });

      return campaign;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}
