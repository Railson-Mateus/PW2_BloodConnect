import { IDonation } from "@/models/Donation";
import { IUser } from "@/models/User";
import { CreateDonationDto } from "@/validators/Donation";
import { RequestUser } from "@/validators/RequestUser";
import { CreateUserDto, UpdateUserDto } from "@/validators/User";

export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<unknown>;
}

export interface IService<T, U> {
  execute(data: T): Promise<U>;
}

// User Service Interfaces
export interface ICreateUserService {
  execute(data: CreateUserDto): Promise<Omit<Required<IUser>, "password">>;
}

export interface IUpdateUserService {
  execute(
    data: UpdateUserDto,
    id: string
  ): Promise<Omit<Required<IUser>, "password">>;
}

export interface IDeleteUserService {
  execute(userId: string): Promise<unknown>;
}

export interface IGetAllUsersService {
  execute(): Promise<Omit<Required<IUser[]>, "password">>;
}

export interface IGetUserByIdService {
  execute(userId: string): Promise<Omit<Required<IUser>, "password">>;
}

// Donation Service Interfaces
export interface ICreateDonationService {
  execute(data: CreateDonationDto): Promise<IDonation>;
}

export interface IDeleteDonationService {
  execute(donationId: string): Promise<IDonation>;
}

export interface IGetAllDonationService {
  execute(): Promise<IDonation[]>;
}

export interface IGetDonationByDonorService {
  execute(donorId: string): Promise<IDonation[]>;
}

export interface IGetDonationByIdService {
  execute(donationId: string): Promise<IDonation | null>;
}

export interface IGetLastDonationByUserService {
  execute(donorId: string): Promise<IDonation | null>;
}
