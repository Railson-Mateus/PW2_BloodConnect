import { HttpRequest, IController } from "@/interfaces/protocols";
import { IDonation } from "@/models/Donation";
import { GetAllDonationService } from "@/services/donation";

export class GetAllDonationController implements IController {
  constructor(private getAllDonationService: GetAllDonationService) {}

  async handle(): Promise<IDonation[]> {
    const donations = this.getAllDonationService.execute();

    return donations;
  }
}
