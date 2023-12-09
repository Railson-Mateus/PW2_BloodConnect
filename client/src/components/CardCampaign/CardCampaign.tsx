import { CampaignSchemaUpdate, CampaignUpdateType } from "@/models/Campaign";
import { zodResolver } from "@hookform/resolvers/zod";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Box, Button, Card, CardContent, CardMedia, FormControl, InputAdornment, InputLabel, Modal, OutlinedInput, Typography } from "@mui/material";
import { register } from "module";
import { useForm } from "react-hook-form";

interface IProps {
  title: string;
  image: string;
  description: string;
  local: string;
  startDate: Date;
  endDate: Date;
  handleOpen:()=>void;
  handleClose:()=>void;
  open: boolean;
}

const CardCampaign = ({title,description,endDate,image,local,startDate, handleOpen, handleClose,open}:IProps) => {

  const dateStart = new Date(startDate);
  const dateEnd = new Date(endDate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignUpdateType>({
    resolver: zodResolver(CampaignSchemaUpdate),
  });

  const updateCampaign = async (data: CampaignUpdateType)=>{
    console.log(data)
  }
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
      <Button sx={{ color: "black" }} onClick={handleOpen}>
        <CreateIcon sx={{ float: "right", marginTop: 1 }} />
      </Button>
      <CardMedia
        component="img"
        sx={{ marginTop: 2, objectFit: "contain", height: 140 }}
        image={image}
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
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "white" }}
        >
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "white" }}
        >
          {local}
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
    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4}}>
   <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-start">Título da campanha</InputLabel>
          <OutlinedInput
            id="outlined-adornment-title"
            type={"text"}
            {...register("title", { required: "Title é obrigatório" })}
            endAdornment={
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
            label="titulo"
            sx={{ bgcolor: "#E8F0FE" }}
          />
          {errors.title && (
            <strong style={{ color: "#dd0000" }}>{errors.title.message}</strong>
          )}
        </FormControl>

        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-image"
                  type={"file"}
                  {...register("image", {
                    required: "Image is required",
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <AddPhotoAlternateIcon />
                    </InputAdornment>
                  }
                  sx={{ bgcolor: "#E8F0FE" }}
                />
                {errors.image && (
                  <strong style={{ color: "#dd0000" }}>
                    {errors.image.message}
                  </strong>
                )}
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-description">Descrição</InputLabel>
          <OutlinedInput
            id="outlined-adornment-description"
            type={"text"}
            {...register("description", { required: "Description is required" })}
            endAdornment={
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
            label="Description"
            sx={{ bgcolor: "#E8F0FE" }}
          />
          {errors.title && (
            <strong style={{ color: "#dd0000" }}>{errors.description.message}</strong>
          )}
        </FormControl>

        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-local">Local</InputLabel>
          <OutlinedInput
            id="outlined-adornment-local"
            type={"text"}
            {...register("local", { required: "Local is obrigatório" })}
            endAdornment={
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
            label="Local"
            sx={{ bgcolor: "#E8F0FE" }}
          />
          {errors.title && (
            <strong style={{ color: "#dd0000" }}>{errors.local.message}</strong>
          )}
        </FormControl>

        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-startDate">Data de início</InputLabel>
          <OutlinedInput
            id="outlined-adornment-startDate"
            type={"text"}
            {...register("startDate", { required: "Data de início é obrigatória" })}
            endAdornment={
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
            label="Data de início"
            sx={{ bgcolor: "#E8F0FE" }}
          />
          {errors.title && (
            <strong style={{ color: "#dd0000" }}>{errors.startDate.message}</strong>
          )}
        </FormControl>

        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-end">Data limite da campanha</InputLabel>
          <OutlinedInput
            id="outlined-adornment-endDate"
            type={"text"}
            {...register("endDate", { required: "Data limite da campanha" })}
            endAdornment={
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
            label="Data limite"
            sx={{ bgcolor: "#E8F0FE" }}
          />
          {errors.endDate && (
            <strong style={{ color: "#dd0000" }}>{errors.endDate.message}</strong>
          )}
        </FormControl>
    <Button onClick={handleSubmit(updateCampaign)}>Salvar</Button>
    
  </Box>
</Modal>
    </>


    
  );
};

export default CardCampaign;