import { Route, Routes } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

import DefaultLayout from "@/layouts/DefaultLayout";
import MainLayout from "@/layouts/MainLayout";

import { useSidebarContext } from "@/hooks/useSidebarContext";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/User/Home";
import Profile from "@/pages/User/Profile";
import { useEffect } from "react";
import HomeAdmin from "@/pages/Admin/Home/HomeAdmin";
import Donnors from "@/pages/Admin/Donnors";
import BloodStockAdmin from "@/pages/Admin/BloodStockAdmin";

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
        label: "Agenda",
        icon: "view_agenda",
        path: "/agenda",
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
          <Route path="/donnors" element={<Donnors />} />
          <Route path="/blood_stock" element={<BloodStockAdmin />} />
        </Route>
      ) : (
        <Route element={<DefaultLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      )}
    </Routes>
  );
};

export default Router;
