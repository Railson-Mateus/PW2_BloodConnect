import {
  HttpRequest,
  IController,
  IDeleteDonationService,
} from "@/interfaces/protocols";
import { IDonation } from "@/models/Donation";

type IProps = {
  id: string;
};

export class DeleteDonationController implements IController {
  constructor(private deleteDonationService: IDeleteDonationService) {}

  async handle(httpRequest: HttpRequest<IProps>): Promise<IDonation> {
    const { id } = httpRequest.params;

    const donationDeleted = await this.deleteDonationService.execute(id);

    return donationDeleted;
  }
}
