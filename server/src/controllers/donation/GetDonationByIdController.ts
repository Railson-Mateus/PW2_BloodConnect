import { HttpRequest, IController } from "@/interfaces/protocols";
import { IDonation } from "@/models/Donation";
import { GetDonationByIdService } from "@/services/donation";

type IProps = {
  id: string;
};

export class GetDonationByIdController implements IController {
  constructor(private getAllDonationByIdService: GetDonationByIdService) {}
  async handle(httpRequest: HttpRequest<IProps>): Promise<IDonation | null> {
    const { id } = httpRequest.params;

    const donationFound = await this.getAllDonationByIdService.execute(id);

    return donationFound;
  }
}
