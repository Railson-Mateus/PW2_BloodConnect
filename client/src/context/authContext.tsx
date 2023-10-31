import { ReactNode, createContext, useEffect, useState } from "react";

import { login, logout } from "@/utils/index";
import { IContextAuth } from "@/types";
import { User } from "@/models/User";
import { api } from "@/api/axios";

export const AuthContext = createContext({} as IContextAuth);

interface IProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<User | null>(null);

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
