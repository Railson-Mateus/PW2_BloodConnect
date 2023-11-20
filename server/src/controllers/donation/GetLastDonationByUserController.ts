import {
  HttpRequest,
  IController,
  IGetLastDonationByUserService,
} from "@/interfaces/protocols";
import { IDonation } from "@/models/Donation";

type IProps = {
  id: string;
};

export class GetLastDonationByUserController implements IController {
  constructor(
    private getLastDonationByUserService: IGetLastDonationByUserService
  ) {}

  async handle(httpRequest: HttpRequest<IProps>): Promise<IDonation | null> {
    const { id } = httpRequest.params;
console.log("Here");

    const lastDonation = await this.getLastDonationByUserService.execute(id);

    return lastDonation;
  }
}
