export interface IDonation {
  id?: string;
  date: Date;
  donorId: string;
  bloodType: string;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date | null;
}
