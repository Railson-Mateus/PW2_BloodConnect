import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";

import styles from "./mainLayout.module.css";

import Sidebar from "@/components/Sidebar";
import { useSidebarContext } from "@/hooks/useSidebarContext";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";

const MainLayout = () => {
  const theme = useTheme();
  const { isSidebarOpen, toggleSidebarOpen } = useSidebarContext();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box className={styles.container}>
      <Sidebar>
        <IconButton
          aria-label="open sidebar"
          onClick={toggleSidebarOpen}
          edge="start"
          sx={{
            ml: 1,
            ...((isSidebarOpen || !smDown) && { display: "none" }),
            color: "#fff",
          }}
        >
          <MenuIcon />
        </IconButton>
      </Sidebar>
      <Outlet />
    </Box>
  );
};

export default MainLayout;
