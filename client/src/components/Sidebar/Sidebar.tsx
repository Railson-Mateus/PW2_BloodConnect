import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import styles from "./Sidebar.module.css";

import { api } from "@/api/axios";
import Logo from "@/assets/logo.png";
import { useAuth } from "@/hooks/useAuth";
import { useSidebarContext } from "@/hooks/useSidebarContext";
import { IDonation } from "@/models/Donation";
import { useNavigate } from "react-router-dom";
import MenuButtonOption from "../MenuButtonOption";
import MenuIcon from "@mui/icons-material/Menu";

type IProps = {
  children: ReactNode;
};

const Sidebar = ({ children }: IProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [lastDonation, setLastDonation] = useState<string>("");
  const [nextDonation, setNextDonation] = useState<string>("");
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { isSidebarOpen, toggleSidebarOpen, sidebarOptions } =
    useSidebarContext();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout();
    navigate("/signin");
  };

  const getLastDonation = async () => {
    const response = await api.get(`/user/${user?.id}/latest-donation`);

    const lastDonation = response.data as IDonation;

    if (lastDonation) {
      const lastDonationDate = new Date(lastDonation.date);

      setLastDonation(lastDonationDate.toLocaleDateString());

      const nextDonationDate = new Date(
        lastDonationDate.setMonth(lastDonationDate.getMonth() + 2)
      );

      setNextDonation(nextDonationDate.toLocaleDateString());
    }
  };

  useEffect(() => {
    if (!user?.isAdmin) getLastDonation();
  }, []);

  const userImgUrl = `http://localhost:3000/uploads/${user?.photo}`;

  return (
    <>
      <Drawer
        open={isSidebarOpen}
        onClose={toggleSidebarOpen}
        variant={smDown ? "temporary" : "permanent"}
        sx={{
          "& .MuiDrawer-paper": {
            borderWidth: 0,
            boxShadow: "6px 0px 16px 0px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <Box
          width={theme.spacing(32)}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Toolbar
            sx={{
              mx: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img className={styles.img} src={Logo} alt="Logo BloodConnect" />
          </Toolbar>
          <Box
            height={135}
            mt={2}
            p={1}
            bgcolor={theme.palette.primary.main}
            display={user?.isAdmin ? "flex" : "block"}
          >
            <Box display={"flex"} alignItems={"center"} mb={1}>
              <Avatar
                sx={{ height: theme.spacing(7), width: theme.spacing(7) }}
                src={userImgUrl}
              />
              <Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    ml: 1,
                  }}
                >
                  {user?.name}
                </Typography>
                {user?.isAdmin ? (
                  <Typography sx={{ color: "#fff", fontWeight: "bold", ml: 1 }}>
                    Admin
                  </Typography>
                ) : (
                  <Typography sx={{ color: "#fff", fontWeight: "bold", ml: 1 }}>
                    Tipo Sanguineo: {user?.bloodType}
                  </Typography>
                )}
              </Box>
            </Box>
            {user?.isAdmin ?? (
              <Box>
                <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                  Ultima Doação: {lastDonation}
                </Typography>
                <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                  Proxima Doação: {nextDonation}
                </Typography>
              </Box>
            )}
          </Box>

          <List component="nav">
            {sidebarOptions.map((sidebarOption) => (
              <Box key={sidebarOption.path}>
                <MenuButtonOption
                  key={sidebarOption.path}
                  icon={sidebarOption.icon}
                  label={sidebarOption.label}
                  to={sidebarOption.path}
                  onClick={smDown ? toggleSidebarOpen : undefined}
                />
                <Divider key={`divider-${sidebarOption.path}`} />
              </Box>
            ))}
          </List>

          <Button
            size={"large"}
            sx={{ mx: "auto", mt: 4, bgColor: theme.palette.primary.main }}
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
      <Box
        height="100%"
        width={"100%"}
        marginLeft={smDown ? 0 : theme.spacing(32)}
      >
        <IconButton
          aria-label="open sidebar"
          onClick={toggleSidebarOpen}
          edge="end"
          sx={{
            ...((isSidebarOpen || !smDown) && { display: "none" }),
            position: "fixed",

            color: "#fff",
          }}
        >
          <MenuIcon />
        </IconButton>
        {children}
      </Box>
    </>
  );
};

export default Sidebar;
