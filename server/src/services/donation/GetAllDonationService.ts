import { ApiError } from "@/helpers/api-erros";
import { IGetAllDonationService } from "@/interfaces/protocols";
import { IDonation } from "@/models/Donation";
import { PrismaClient } from "@prisma/client";

export class GetAllDonationService implements IGetAllDonationService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(): Promise<IDonation[]> {
    try {
      const donations = await this.prisma.donation.findMany();

      return donations;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}
