import { ApiError } from "@/helpers/api-erros";
import { IGetDonationByDonorService } from "@/interfaces/protocols";
import { IDonation } from "@/models/Donation";
import { PrismaClient } from "@prisma/client";

export class GetDonationsByDonorService implements IGetDonationByDonorService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(donorId: string): Promise<IDonation[]> {
    try {
      const donations = await this.prisma.donation.findMany({
        where: {
          donorId,
        },
      });

      return donations;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}
