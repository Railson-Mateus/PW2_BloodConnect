import { ICampaign } from "@/models/Campaign";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface IProps {
  campaign: ICampaign;
  handleOpen?: (campaign: ICampaign) => void;
}

const CardCampaign = ({ campaign, handleOpen }: IProps) => {
  const dateStart = new Date(campaign.startDate);
  const dateEnd = new Date(campaign.endDate);

  const userImgUrl = `http://localhost:3000/uploads/${campaign?.image}`;

  const handleEdit = () => {
    handleOpen(campaign);
  };

  return (
    <>
      <Card
        sx={{
          width: 500,
          height: 300,
          backgroundColor: "rgba(217,217,217,0.2)",
        }}
      >
        <DeleteIcon sx={{ float: "right", marginTop: 1 }} />
        <Button sx={{ color: "black" }} onClick={handleEdit}>
          <CreateIcon sx={{ float: "right", marginTop: 1 }} />
        </Button>
        <CardMedia
          component="img"
          sx={{ marginTop: 2, objectFit: "contain", height: 140 }}
          image={userImgUrl}
          title="imagem-hemonucleo"
        ></CardMedia>
        <CardContent
          sx={{ display: "flex", flexDirection: "column", color: "white" }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {campaign.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white" }}
          >
            {campaign.description}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white" }}
          >
            {campaign.local}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white" }}
          >
            {dateStart.toLocaleDateString()}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white" }}
          >
            {dateEnd.toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default CardCampaign;
