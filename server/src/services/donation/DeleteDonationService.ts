import { ApiError } from "@/helpers/api-erros";
import { IDeleteDonationService } from "@/interfaces/protocols";
import { IDonation } from "@/models/Donation";
import { PrismaClient } from "@prisma/client";

export class DeleteDonationService implements IDeleteDonationService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: string): Promise<IDonation> {
    try {
      const deletedDonation = await this.prisma.donation.delete({
        where: { id },
      });

      return deletedDonation;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}
