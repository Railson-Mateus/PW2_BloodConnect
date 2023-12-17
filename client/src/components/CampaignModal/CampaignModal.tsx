import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CampaignCreateType, CampaignSchemaCreate } from "@/models/Campaign";
import { api } from "@/api/axios";
import moment from "moment";

interface IProps {
  modal: boolean;
  closeModal: () => void;
}

const CampaignModal = ({ modal, closeModal }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignCreateType>({
    resolver: zodResolver(CampaignSchemaCreate),
  });

  const createCampaign = async (data: CampaignCreateType) => {
      console.log(data)
    try {
      const formData = new FormData();

      formData.append("photo", data.image[0]);

      const response = await api.post("/file", formData);

      data.image = `http://localhost:3000/uploads/${response.data}`;

      data.startDate = moment(data.startDate, "DD/MM/YYYY").format();
      data.endDate = moment(data.endDate, "DD/MM/YYYY").format();

      await api.post("/campaign", data);

      alert("Campanha criada com sucesso!");
      closeModal();
    } catch (error) {
      alert("Erro ao criar a campanha!");
    }
  };

  return (
    <Modal
      open={modal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-start">
            Título da campanha
          </InputLabel>
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
            <strong style={{ color: "#dd0000" }}>{errors.image.message}</strong>
          )}
        </FormControl>

        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-description">
            Descrição
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-description"
            type={"text"}
            {...register("description", {
              required: "Description is required",
            })}
            endAdornment={
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
            label="Description"
            sx={{ bgcolor: "#E8F0FE" }}
          />
          {errors.title && (
            <strong style={{ color: "#dd0000" }}>
              {errors.description.message}
            </strong>
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
          <InputLabel htmlFor="outlined-adornment-startDate">
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-startDate"
            type={"date"}
            {...register("startDate", {
              required: "Data de início é obrigatória",
            })}
            label="Data de início"
            sx={{ bgcolor: "#E8F0FE" }}
          />
          {errors.title && (
            <strong style={{ color: "#dd0000" }}>
              {errors.startDate.message}
            </strong>
          )}
        </FormControl>

        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-endDate"
            type={"date"}
            {...register("endDate", {
              required: "Data limite da campanha",
            })}
            label="Data limite"
            sx={{ bgcolor: "#E8F0FE" }}
          />
          {errors.endDate && (
            <strong style={{ color: "#dd0000" }}>
              {errors.endDate.message}
            </strong>
          )}
        </FormControl>
        <Button onClick={handleSubmit(createCampaign)}>Salvar</Button>
        <Button onClick={closeModal}>X</Button>
      </Box>
    </Modal>
  );
};

export default CampaignModal;
