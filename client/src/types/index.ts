import { User } from "@/models/User";

export interface ILoginRequest {
  email: string;
  password: string;
  admin: boolean;
}

export interface ILoginResponse {
  token: string;
  user: User;
}

export interface IContextAuth {
  user: User | null;
  login: ({ email, password }: ILoginRequest) => Promise<string>;
  logout: () => void;
}
