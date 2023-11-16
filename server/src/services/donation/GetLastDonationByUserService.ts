import { ApiError } from "@/helpers/api-erros";
import { IGetLastDonationByUserService } from "@/interfaces/protocols";
import { IDonation } from "@/models/Donation";
import { PrismaClient } from "@prisma/client";

export class GetLastDonationByUserService
  implements IGetLastDonationByUserService
{
  constructor(private readonly prisma: PrismaClient) {}

  async execute(donorId: string): Promise<IDonation | null> {
    try {
      const lastDonation = await this.prisma.donation.findFirst({
        where: {
          donorId,
        },
        orderBy: {
          date: "desc",
        },
      });

      return lastDonation;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}
