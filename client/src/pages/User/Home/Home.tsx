import { api } from "@/api/axios";
import CarrouselImage from "@/components/Carrousel";
import { ICampaign } from "@/models/Campaign";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import BloodStockHeader from "@/components/BloodStockHeader";

const Home = () => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([] as ICampaign[]);

  const getCampanhas = async () => {
    try {
      const response = await api.get("/campaign");
      const campaigns = response.data;

      setCampaigns(campaigns);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCampanhas();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <BloodStockHeader />
      <CarrouselImage campaigns={campaigns} />
    </Box>
  );
};

export default Home;
