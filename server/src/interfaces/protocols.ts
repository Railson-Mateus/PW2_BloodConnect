import { IUser } from "@/models/User";
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

export interface ICreateUserService {
  execute(data: CreateUserDto): Promise<Omit<Required<IUser>, "password">>;
}

export interface IUpdateUserService {
  execute(data: UpdateUserDto): Promise<IUser>;
}

export interface ISessionService {
  execute({ email, password }: RequestUser): Promise<{ token: string }>;
}
