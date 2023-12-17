import { useAuth } from "@/hooks/useAuth";
import { ICampaign } from "@/models/Campaign";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface IProps {
  campaign: ICampaign;
  handleOpen?: (campaign: ICampaign) => void;
  handleDelete?: (id: string) => void;
}

const CardCampaign = ({ campaign, handleOpen, handleDelete }: IProps) => {
  const { user } = useAuth();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dateStart = new Date(campaign.startDate);
  const dateEnd = new Date(campaign.endDate);

  const userImgUrl = `http://localhost:3000/uploads/${campaign?.image}`;

  const handleEdit = () => {
    handleOpen(campaign);
  };

  const handleDeleteCampaign = () => {
    handleDelete(campaign.id);
  };

  return (
    <>
      <Card
        sx={{
          width: isSmallScreen ? 300 : 500,
          height: isSmallScreen ? 300 : 300,
          backgroundColor: "rgba(217,217,217,0.2)",
        }}
      >
        {/* rend caso for admin */}
        {user?.isAdmin && (
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button sx={{ color: "black" }} onClick={handleEdit}>
              <CreateIcon sx={{ float: "right", marginTop: 1 }} />
            </Button>
            <Button sx={{ color: "black" }} onClick={handleDeleteCampaign}>
              <DeleteIcon sx={{ float: "right", marginTop: 1 }} />
            </Button>
          </Box>
        )}
        <CardMedia
          component="img"
          sx={{ marginTop: 0, objectFit: "contain", height: 120 }}
          image={campaign.image}
          title="imagem-de-campanha"
        ></CardMedia>
        <CardContent
          sx={{ display: "flex", flexDirection: "column", color: "white" }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center", fontSize: 20 }}
          >
            {campaign.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white", textAlign: "center" }}
          >
            {campaign.description}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white", textAlign: "center" }}
          >
            {campaign.local}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white", textAlign: "center" }}
          >
            {dateStart.toLocaleDateString()}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white", textAlign: "center" }}
          >
            {dateEnd.toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default CardCampaign;
