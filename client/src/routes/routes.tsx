import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

import DefaultLayout from "@/layouts/DefaultLayout";
import MainLayout from "@/layouts/MainLayout";

import { useSidebarContext } from "@/hooks/useSidebarContext";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/User/Home";
import Profile from "@/pages/User/Profile";
import Campaign from "@/pages/User/Campaign";
import { useEffect } from "react";
import HomeAdmin from "@/pages/Admin/Home/HomeAdmin";
import Donnors from "@/pages/Admin/Donnors";
import BloodStockAdmin from "@/pages/Admin/BloodStockAdmin";
import BloodStock from "@/pages/User/BloodStock";

const Router = () => {
  const { user } = useAuth();
  const { setSidebarOptions } = useSidebarContext();
  const isLogged = !!user;
  const isAdmin = user?.isAdmin;

  useEffect(() => {
    setSidebarOptions([
      {
        label: "Home",
        icon: "home",
        path: "/home",
      },
      {
        label: "Blood Stock",
        icon: "inventory_2",
        path: "/blood_stock",
      },
      {
        label: "Campaign",
        icon: "campaign",
        path: "/campaign",
      },
      {
        label: isAdmin ? "Donnors" : "Profile",
        icon: isAdmin ? "group" : "person",
        path: isAdmin ? "/donnors" : "/profile",
      },
    ]);
  }, [isAdmin]);

  return (
    <Routes>
      {isLogged ? (
        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={isAdmin ? <HomeAdmin /> : <Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/donnors" element={<Donnors />} />
          <Route
            path="/blood_stock"
            element={isAdmin ? <BloodStockAdmin /> : <BloodStock />}
          />
        </Route>
      ) : (
        <Route element={<DefaultLayout />}>
          <Route index element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      )}
    </Routes>
  );
};

export default Router;
