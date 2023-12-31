import Chart from "@/components/Chart";
import { Box, Icon } from "@mui/material";
import { useEffect, useState } from "react";
import { IDonation } from "@/models/Donation";
import { api } from "@/api/axios";

import PeopleIcon from "@mui/icons-material/People";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CampaignIcon from "@mui/icons-material/Campaign";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

import CardComponent from "@/components/Card/Card";
import { User } from "@/models/User";
import { ICampaign } from "@/models/Campaign";

const HomeAdmin = () => {
  const [donations, setDonations] = useState<IDonation[]>([]);
  const [donors, setDonors] = useState<User[]>([]);
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [appointments, setAppointments] = useState<IDonation[]>([]);

  useEffect(() => {
    const fetchDataForEndpoint = async (
      endpoint: string,
      setData: React.Dispatch<React.SetStateAction<any[]>>
    ) => {
      const result = await api.get(endpoint);
      setData(result.data);
    };

    const fetchDataForAllEndpoints = async () => {
      const promises = [
        fetchDataForEndpoint("/donation", setDonations),
        fetchDataForEndpoint("/user", setDonors),
        fetchDataForEndpoint("/donation", setAppointments),
        fetchDataForEndpoint("/campaign", setCampaigns),
      ];

      await Promise.all(promises);
    };

    fetchDataForAllEndpoints();
  }, []);

  return (
    <Box height={"68.7%"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
          padding: 2,
          mt: 2,
          gap: 2,
        }}
      >
        <CardComponent
          children={<PeopleIcon fontSize="large" />}
          title="Donors"
          total={donors.length}
        />
        <CardComponent
          children={<DateRangeIcon fontSize="large" />}
          title="Appointments"
          total={appointments.length}
        />
        <CardComponent
          children={<CampaignIcon fontSize="large" />}
          title="Campaigns"
          total={campaigns.length}
        />
        <CardComponent
          children={<VolunteerActivismIcon fontSize="large" />}
          title="Donations"
          total={donations.length}
        />
      </Box>
      <Box height={"100%"} width={"100%"}>
        <Chart donations={donations} />
      </Box>
    </Box>
  );
};

export default HomeAdmin;
