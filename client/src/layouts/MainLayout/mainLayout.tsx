import { Outlet } from "react-router-dom";

import styles from "./mainLayout.module.css";

import Sidebar from "@/components/Sidebar";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <Box className={styles.container}>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </Box>
  );
};

export default MainLayout;
