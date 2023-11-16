import { ApiError } from "@/helpers/api-erros";
import { IGetDonationByIdService } from "@/interfaces/protocols";
import { IDonation } from "@/models/Donation";
import { PrismaClient } from "@prisma/client";

export class GetDonationByIdService implements IGetDonationByIdService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(donationId: string): Promise<IDonation | null> {
    try {
      const donation = await this.prisma.donation.findUnique({
        where: {
          id: donationId,
        },
      });

      return donation;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}
