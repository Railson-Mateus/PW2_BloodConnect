import { ICampaign } from "@/models/Campaign";
import Carousel from "react-material-ui-carousel";
import CardCampaign from "../CardCampaign";

interface IProps {
  campaigns: ICampaign[];
}

const CarrouselImage = ({ campaigns }: IProps) => {
  console.log(campaigns);

  return (
    <Carousel
      animation={"slide"}
      autoPlay={true}
      duration={500}
      sx={{
        width: "500px",
        m: "auto",
        mt: 6,
      }}
    >
      {campaigns.map((campaign) => (
        <CardCampaign key={campaign.id} campaign={campaign} />
      ))}
    </Carousel>
  );
};

export default CarrouselImage;
