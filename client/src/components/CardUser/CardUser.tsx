import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import backgroundImage from "../../assets/Mask.png";
import { IDonation } from "@/models/Donation";
import { useEffect, useState } from "react";
import { api } from "@/api/axios";

interface IProps {
  imageUrl: string | null,
  nome: string,
  typeBlood: string,
  id: string | undefined
}

const CardUser = ({imageUrl, nome, typeBlood, id}:IProps) => {
  const [lastDonation, setLastDonation] = useState("Nenhuma doacao realizada")
  console.log(imageUrl)
  const getLastDonation = async (id:string) => {
    const response = await api.get(`/user/${id}/latest-donation`);

    const lastDonation = response.data as IDonation;

    if (lastDonation) {
      const lastDonationDate = new Date(lastDonation.date);
      setLastDonation(lastDonationDate.toLocaleDateString())
    }
  
  };

  useEffect(()=>{
    getLastDonation(id)
  })

  return (
    <Card
      sx={{
        width: 303,
        height: 378,
        borderRadius: "16px",
        background: "#D13C3E",
        boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.7,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          sx={{ width: "140px", height: "140px", mt: 2 }}
          src= {imageUrl}
          alt="Nada"
        />
        <Box mt={4}>
          <Typography sx={{ fontSize: 22, fontWeight: 300, color: "#fff" }}>
            Nome: {nome}
          </Typography>
        </Box>

        <Divider variant="fullWidth" />

        <Box>
          <Typography sx={{ fontSize: 22, fontWeight: 300, color: "#fff" }}>
            Tipo sanguineo: {typeBlood}
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 300, color: "#fff" }}>
            Ultima doação: {lastDonation}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardUser;
