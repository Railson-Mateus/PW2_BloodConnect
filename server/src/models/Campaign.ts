export interface ICampaign {
  id?: string;
  title: string;
  image: string;
  description: string;
  local: string;
  startDate: string;
  endDate: string;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export interface IUpdateCampaign extends Partial<ICampaign> {}
