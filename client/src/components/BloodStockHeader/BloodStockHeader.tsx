import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import styles from "./BloodStockHeader.module.css";
import BloodLevel from "../BloodLevel";
import { useEffect, useState } from "react";
import { IDonation } from "@/models/Donation";
import { api } from "@/api/axios";
import moment from "moment";

const BloodStockHeader = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [donations, setDonations] = useState<IDonation[]>();

  const date = donations?.reduce((maxDate, donation) => {
    return donation.date > maxDate ? donation.date : maxDate;
  }, donations[0].date);

  const latestDonation = moment(date).format("DD/MM/YYYY");

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
    <Box p={1} className={styles.header}>
      {isSmallScreen ? (
        <Grid container>
          <Grid item sx={{ display: "flex", flexDirection: "column" }}>
            <Typography color={"#fff"} fontSize={".8rem"}>
              Estoque atualizado em: {latestDonation}
            </Typography>
          </Grid>

          <Grid
            item
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {rawData.map((value) => (
              <BloodLevel nivel={value[1]} tipo={value[0]} />
            ))}
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12} md={3}>
            <Typography color={"#fff"} fontSize={"1.5rem"} fontWeight={600}>
              Estoque de
            </Typography>
            <Typography color={"#fff"} fontSize={"2.5rem"} fontWeight={700}>
              Sangue
            </Typography>
            <Typography color={"#fff"} fontSize={".8rem"} pt={5}>
              Estoque atualizado em: {latestDonation}
            </Typography>
          </Grid>

          <Grid item xs={12} md={9}>
            {rawData.map((value) => (
              <BloodLevel nivel={value[1]} tipo={value[0]} />
            ))}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default BloodStockHeader;
