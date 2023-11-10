import { HttpRequest, IController } from "@/interfaces/protocols";
import { IDonation } from "@/models/Donation";
import { GetDonationsByDonorService } from "@/services/donation";

type IProps = {
  id: string;
};

export class GetDonationByDonorController implements IController {
  constructor(private getAllDonationByIdService: GetDonationsByDonorService) {}

  async handle(httpRequest: HttpRequest<IProps>): Promise<IDonation[] | null> {
    const { id } = httpRequest.params;

    const donations = await this.getAllDonationByIdService.execute(id);

    return donations;
  }
}
