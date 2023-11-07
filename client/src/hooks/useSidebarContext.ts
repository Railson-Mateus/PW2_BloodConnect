import { SidebarContext } from "@/context/sidebarContext";
import { useContext } from "react";

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
