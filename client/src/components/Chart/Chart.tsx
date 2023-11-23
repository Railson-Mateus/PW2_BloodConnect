import { IDonation } from "@/models/Donation";
import { Box } from "@mui/material";
import { Chart } from "react-google-charts";

type IProps = {
  donations: IDonation[] | undefined;
};
const ChartComponent = ({ donations }: IProps) => {
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
    <Box bgcolor={"#ffffff"} height={"67.3%"} paddingLeft={2} paddingTop={2}>
      <Chart
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={rawData}
        options={{
          chartArea: { left: 15, top: 60, right: 0, bottom: 60 },
          pieSliceText: "label",
          width: 650,
          height: 420,
          title: "Donors by blood type",
          legend: { position: "bottom", alignment: "center" },
        }}
        chartWrapperParams={{ view: { columns: [0, 1] } }}
      />
    </Box>
  );
};

export default ChartComponent;
