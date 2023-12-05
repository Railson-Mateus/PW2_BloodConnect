export interface IUser {
  id?: string | undefined;
  email: string;
  password: string;
  name: string;
  bloodType: string;
  gender?: string | null;
  photo?: string | null;
  dateOfBirth: string | Date;
  phone: string;
  isAdmin: boolean;
  termsOfUseAccepted: boolean;
  privacyPolicy: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string | null;
}

export interface IUpdateUser extends Partial<IUser> {}

export interface UserPayload {
  userId: string;
  admin: boolean;
}
