import { useAuth } from "@/hooks/useAuth";
import { api } from "@/api/axios";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IDonation } from "@/models/Donation";

const Profile = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  let dateOfBirth = user?.dateOfBirth;
  dateOfBirth = new Date(dateOfBirth);

  const [lastDonation, setLastDonation] = useState<string>("");
  const [nextDonation, setNextDonation] = useState<string>("");

  const getLastDonation = async () => {
    const response = await api.get(`/user/${user?.id}/latest-donation`);

    const lastDonation = response.data as IDonation;

    const lastDonationDate = new Date(lastDonation.date);

    setLastDonation(lastDonationDate.toLocaleDateString());

    const nextDonationDate = new Date(
      lastDonationDate.setMonth(lastDonationDate.getMonth() + 2)
    );

    setNextDonation(nextDonationDate.toLocaleDateString());
  };

  useEffect(() => {
    getLastDonation();
  }, []);

  return (
    <Box
      width={"100%"}
      sx={{
        color:"white",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "100%",
        flexDirection: "column"
      }}
    >
      <Stack
        direction="column"
        spacing={1}
        alignItems={"center"}
        marginBottom={isSmallScreen? 1 : 2}
      >
        <Avatar
          sx={{
            width: 200,
            height: 200,
            borderRadius:1,
            "& .MuiAvatar-img": {
              objectFit: "contain",
            },
          }}
          alt="Débora Camilly"
          src={`http://localhost:3000/uploads/${user?.photo}`}
        />
        <Typography sx={{ fontSize: "1.2rem"}}>{user?.email}</Typography>
      </Stack>
      <Card
        variant="outlined"
        sx={{
          justifyContent: "center",
          width: isSmallScreen ? 300 : 500,
          height: isSmallScreen? 250: 400,
          alignSelf: "center",
          borderRadius: 2,
          marginBottom: isSmallScreen? 1 : 0,
          bgcolor: "rgba(217,217,217,0.4)",
        }}
      >
        <CardContent sx={{}}>
          <Typography
            sx={{
              margimTop: 5,
              textAlign: "center",
              fontSize: isSmallScreen ? "1.1rem" : "1.5rem",
              fontStyle: "italic",
              color:"white"
            }}
          >
            Tipo Sanguíneo: {user?.bloodType}
          </Typography>

          <Typography sx={{fontSize: isSmallScreen ? "1.1rem" : "1.5rem", color:"white",}}>
            Nome: {user?.name}
          </Typography>

          <Typography sx={{  fontSize: isSmallScreen ? "1.1rem" : "1.5rem", color:"white", }}>
            Gênero: {user?.gender}
          </Typography>

          <Typography sx={{  fontSize: isSmallScreen ? "1.1rem" : "1.5rem", color:"white", }}>
            Telefone: {user?.phone}
            </Typography>

          <Typography sx={{  fontSize: isSmallScreen ? "1.1rem" : "1.5rem", color:"white", }}>
            Data de Nascimento: {dateOfBirth.toLocaleDateString()}
          </Typography>

          <Typography sx={{  fontSize: isSmallScreen ? "1.1rem" : "1.5rem", color:"white", }}>
            Última doação:{" "}
            {lastDonation ? lastDonation : "Você ainda não fez doações"}
          </Typography>

          <Typography sx={{  fontSize: isSmallScreen ? "1.1rem" : "1.5rem", color:"white" }}>
            Próxima doação:{" "}
            {nextDonation ? nextDonation : "Você ainda não fez doações"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
