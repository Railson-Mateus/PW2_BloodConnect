import { ReactNode, createContext, useEffect, useState } from "react";

import { api } from "@/api/axios";
import { User } from "@/models/User";
import { IContextAuth, ILoginRequest, ILoginResponse } from "@/types";

export const AuthContext = createContext({} as IContextAuth);

interface IProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = async () => {
    try {
      localStorage.removeItem("auth.token");
      localStorage.removeItem("auth.user");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async ({ email, password }: ILoginRequest) => {
    try {
      const data = { email, password };

      const response = await api.post("/auth/signin", data);
      const { token, user } = response.data as ILoginResponse;

      console.log(token, user)
      localStorage.setItem("auth.token", token);
      localStorage.setItem("auth.user", JSON.stringify(user));

      setUser(user);
    } catch (error) {
      return "Senha ou email incorreta";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth.token");
    const user = localStorage.getItem("auth.user");

    if (token && user) {
      const userObject = JSON.parse(user);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setUser(userObject);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
