import CardCampaign from "@/components/CardCampaign";
import { useAuth } from "@/hooks/useAuth";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import campaign from "../../../assets/campaign.png";
import { api } from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { ICampaign } from "@/models/Campaign";

const Campaign = () => {
  const {user} = useAuth()
  const [open, setOpen] = React.useState(false);
  const [campaigns, setCampaigns] = React.useState<ICampaign[]>(
    [] as ICampaign[]
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const getCampanhas = async () => {
    try {
      const response = await api.get("/campaign");
      const campaigns = response.data;
      console.log(response.data);
      setCampaigns(campaigns);
      navigate("/campaign");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {

  }

  useEffect(() => {
    getCampanhas();
  }, [campaigns]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        flexWrap: "wrap",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          paddingLeft: 5,
          marginTop: 2,
          marginBottom: 3,
          width: "100%",
          height: "18%",
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <img src={campaign} alt="imagem de campanha" />
        <Typography
          sx={{
            fontSize: 40,
            color: "white",
            fontStyle: "bold",
            paddingTop: 10,
            width: 700,
          }}
        >
          DOE RECOMEÇOS, DOE SANGUE!
        </Typography>
        <Button sx={{bgcolor: "transparent"}} size="medium">
          <AddCircleIcon sx={{ color: "#000", fontSize: 54}}/>
        </Button>
      </Box>

      {campaigns.map((campaign) => (
        <CardCampaign
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
          image={campaign.image}
          local={campaign.local}
          startDate={campaign.startDate}
          title={campaign.title}
          description={campaign.description}
          endDate={campaign.endDate}
        />
      ))}
    </Box>
  );
};

export default Campaign;
