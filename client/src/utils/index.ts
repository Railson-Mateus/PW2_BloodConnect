import { api } from "@/api/axios";
import { ILoginRequest, ILoginResponse } from "@/types";

export const login = async ({ email, password, admin }: ILoginRequest) => {
  const urlLogin: string = admin ? "/admin/signin" : "/signin";
  console.log(urlLogin);

  try {
    const data = { email, password };

    const response = await api.post(urlLogin, data);
    const { token, user } = response.data as ILoginResponse;

    localStorage.setItem("auth.token", JSON.stringify(token));
    localStorage.setItem("auth.user", JSON.stringify(user));
  } catch (error) {
    return error.response.data.message;
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("auth.token");
    localStorage.removeItem("auth.user");
  } catch (error) {
    console.log(error);
  }
};
