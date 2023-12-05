import { Box, Grid, Typography } from "@mui/material";
import styles from "./BloodStockHeader.module.css";
import BloodLevel from "../BloodLevel";
import { useEffect, useState } from "react";
import { IDonation } from "@/models/Donation";
import { api } from "@/api/axios";

const BloodStockHeader = () => {
  const [donations, setDonations] = useState<IDonation[]>();

  const date = donations?.reduce((maxDate, donation) => {
    return donation.date > maxDate ? donation.date : maxDate;
  }, donations[0].date);

  const latestDonation = new Date(date);

  const getDonations = async () => {
    const response = await api.get("/donation");
    setDonations(response.data);
  };

  const groupDonationsByBloodType = () => {
    const groupedData: { [bloodType: string]: number } = {};

    donations?.forEach((donation) => {
      const { bloodType, amount } = donation;

      if (groupedData[bloodType]) {
        groupedData[bloodType] += amount;
      } else {
        groupedData[bloodType] = amount;
      }
    });
    // Converter o objeto em um array de arrays
    const result: [string, number][] = Object.keys(groupedData).map(
      (bloodType) => [bloodType, groupedData[bloodType]]
    );

    return result;
  };

  const rawData = groupDonationsByBloodType();

  useEffect(() => {
    getDonations();
  }, []);

  return (
    <Box height={"34%"} className={styles.header}>
      <Box
        width={"23.2%"}
        sx={{
          padding: 2,
        }}
      >
        <>
          <Typography color={"#fff"} fontSize={20} fontWeight={600}>
            Estoque de
          </Typography>
          <Typography color={"#fff"} fontSize={46} fontWeight={700}>
            Sangue
          </Typography>
        </>
        <Typography color={"#fff"} fontSize={14} pt={9}>
          Estoque atualizado em: {latestDonation.toLocaleDateString()}
        </Typography>
      </Box>
      <Grid container width={"77%"}>
        <Grid
          container
          justifyContent="center"
          alignItems={"center"}
          spacing={2}
        >
          {rawData.map((value) => (
            <BloodLevel nivel={value[1]} tipo={value[0]} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default BloodStockHeader;
