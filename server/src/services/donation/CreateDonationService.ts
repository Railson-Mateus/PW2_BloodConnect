import { ApiError } from "@/helpers/api-erros";
import { ICreateDonationService } from "@/interfaces/protocols";
import { IDonation } from "@/models/Donation";
import { CreateDonationDto } from "@/validators/Donation";
import { PrismaClient } from "@prisma/client";

export class CreateDonationService implements ICreateDonationService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(data: CreateDonationDto): Promise<IDonation> {
    try {
      const result = await this.prisma.donation.create({
        data,
      });

      return result;
    } catch (error) {
      throw new ApiError(error.message, 500);
    }
  }
}
