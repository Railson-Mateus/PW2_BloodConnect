import { User } from "@/models/User";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: User;
  expiresIn: number;
}

export interface IContextAuth {
  user: User | null;
  login: ({
    email,
    password,
    admin,
  }: ILoginRequest) => Promise<string | undefined>;
  logout: () => void;
}
