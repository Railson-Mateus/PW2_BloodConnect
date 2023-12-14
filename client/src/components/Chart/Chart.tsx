import { IDonation } from "@/models/Donation";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Chart } from "react-google-charts";

type IProps = {
  donations: IDonation[] | undefined;
};
const ChartComponent = ({ donations }: IProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const groupDonationsByBloodType = (donations: IDonation[] | undefined) => {
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
    const result: [string, number | string][] = Object.keys(groupedData).map(
      (bloodType) => [bloodType, groupedData[bloodType]]
    );

    return result;
  };

  const rawData = groupDonationsByBloodType(donations);
  rawData.unshift(["type blood", "Amount"]);

  return (
    <Box bgcolor={"#ffffff"} height={"100%"} width={"100%"} paddingLeft={2}>
      <Chart
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={rawData}
        width={"100%"}
        height={"auto"}
        options={{
          chartArea: { left: 0, top: 60, right: 50, bottom: 60 },
          pieSliceText: "label",
          width: isSmallScreen ? 400 : 650,
          height: isSmallScreen ? 320 : 420,
          title: "Donors by blood type",
          legend: { position: "bottom", alignment: "center" },
        }}
        chartWrapperParams={{ view: { columns: [0, 1] } }}
      />
    </Box>
  );
};

export default ChartComponent;
