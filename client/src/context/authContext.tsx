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
      localStorage.removeItem("auth.expirationDate");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async ({ email, password }: ILoginRequest) => {
    try {
      const data = { email, password };

      const response = await api.post("/auth/signin", data);
      const { token, user, expiresIn } = response.data as ILoginResponse;

      const expirationDate = new Date(Date.now() + expiresIn * 1000);

      localStorage.setItem("auth.token", token);
      localStorage.setItem("auth.user", JSON.stringify(user));
      localStorage.setItem("auth.expirationDate", expirationDate.toISOString());

      setUser(user);
    } catch (error) {
      return "Senha ou email incorreta";
    }
  };

  const isTokenExpired = () => {
    const expirationDate = localStorage.getItem("auth.expirationDate");
    if (!expirationDate) {
      return true;
    }

    const now = new Date();
    return now > new Date(expirationDate);
  };

  const checkTokenExpiration = () => {
    if (isTokenExpired()) {
      logout();
    }
  };

  useEffect(() => {
    checkTokenExpiration();
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
