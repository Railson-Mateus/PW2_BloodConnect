import CardCampaign from "@/components/CardCampaign";
import { useAuth } from "@/hooks/useAuth";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { api } from "@/api/axios";
import {
  CampaignCreateType,
  CampaignSchemaCreate,
  CampaignSchemaUpdate,
  CampaignUpdateType,
  ICampaign,
} from "@/models/Campaign";
import { zodResolver } from "@hookform/resolvers/zod";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import campaign from "../../../assets/campaign.png";
import moment from "moment";

const Campaign = () => {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [selectedCampaign, setSelectedCampaign] =
    React.useState<ICampaign | null>(null);
  const [campaigns, setCampaigns] = React.useState<ICampaign[]>(
    [] as ICampaign[]
  );

  const getCampanhas = async () => {
    try {
      const response = await api.get("/campaign");
      const campaigns = response.data;
      setCampaigns(campaigns);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const confirmExclusion = confirm("Deseja excluir a campanha?");
      if (confirmExclusion) {
        await api.delete(`/campaign/${id}`);

        alert("Campanha excluida com sucesso!");
        getCampanhas();
      }
    } catch (error) {
      alert(`Error ao tentar excluir!, ${error.message}`);
    }
  };

  const handleClose = () => {
    setSelectedCampaign(null);
    setOpen(false);
  };

  const handleOpen = (campaign: ICampaign) => {
    setSelectedCampaign(campaign);
    setOpen(true);
  };

  //campaign edit
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CampaignUpdateType>({
    resolver: zodResolver(CampaignSchemaUpdate),
  });

  const updateCampaign = async (data: CampaignUpdateType) => {
    try {
     //tirar if
      if (typeof data.image !== "string") {
        const formData = new FormData();

        formData.append("photo", data.image[0]);

        const response = await api.post("/file", formData);

        data.image = `http://localhost:3000/uploads/${response.data}`;

      }

      data.startDate = moment(data.startDate, "DD/MM/YYYY").format();
      data.endDate = moment(data.endDate, "DD/MM/YYYY").format();

      await api.patch(`/campaign/${selectedCampaign?.id}`, data);
      
      alert("Campanha atualizada com sucesso!");
      handleClose();
    } catch (error) {
      alert("Error ao atualizar a campanha!");
    }
  };

  useEffect(() => {
    if (selectedCampaign) {
      const endDate = new Date(selectedCampaign.endDate).toLocaleDateString();
      const startDate = new Date(
        selectedCampaign.startDate
      ).toLocaleDateString();

      setValue("title", selectedCampaign.title);
      setValue("description", selectedCampaign.description);
      setValue("image", selectedCampaign.image);
      setValue("startDate", startDate);
      setValue("endDate", endDate);
      setValue("local", selectedCampaign.local);
    }
    getCampanhas();
  }, [selectedCampaign, setValue]);

//create campaign
// const handleCloseCreate = () => {
//   setSelectedCampaign(null);
//   setOpen(false);
// };

// const handleOpenCreate = (campaign: ICampaign) => {
//   setSelectedCampaign(campaign);
//   setOpen(true);
// };


// const {
//   registerCreate,
//   handleSubmitCreate,
//   setValueCreated,
//   formState: { errors },
// } = useForm<CampaignCreateType>({
//   resolver: zodResolver(CampaignSchemaCreate),
// });

// const createCampaign = async (data: CampaignCreateType) => {
//   try {
//    //tirar if
//     if (typeof data.image !== "string") {
//       const formData = new FormData();

//       formData.append("photo", data.image[0]);

//       const response = await api.post("/file", formData);

//       data.image = `http://localhost:3000/uploads/${response.data}`;

//     }

//     data.startDate = moment(data.startDate, "DD/MM/YYYY").format();
//     data.endDate = moment(data.endDate, "DD/MM/YYYY").format();

//     await api.patch(`/campaign/${selectedCampaign?.id}`, data);
    
//     alert("Campanha criada com sucesso!");
//     handleClose();
//   } catch (error) {
//     alert("Error ao criar a campanha!");
//   }
// };

// useEffect(() => {
//   if (selectedCampaign) {
//     const endDate = new Date(selectedCampaign.endDate).toLocaleDateString();
//     const startDate = new Date(
//       selectedCampaign.startDate
//     ).toLocaleDateString();

//     setValue("title", selectedCampaign.title);
//     setValue("description", selectedCampaign.description);
//     setValue("image", selectedCampaign.image);
//     setValue("startDate", startDate);
//     setValue("endDate", endDate);
//     setValue("local", selectedCampaign.local);
//   }
//   getCampanhas();
// }, [selectedCampaign, setValue]);


  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        pb: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        flexWrap: "wrap",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          paddingLeft: 5,
          marginTop: 2,
          marginBottom: 3,
          width: "100%",
          height: "18%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Avatar
          sx={{ width: 128, height: 128 }}
          src={campaign}
          alt="imagem de campanha"
        />

        <Typography
          sx={{
            fontSize: 40,
            color: "white",
            fontStyle: "bold",
            paddingTop: 10,
            width: 700,
          }}
        >
          DOE RECOMEÇOS, DOE SANGUE!
        </Typography>
        <Button sx={{ bgcolor: "transparent" }} size="medium">
          <AddCircleIcon sx={{ color: "#000", fontSize: 54 }} />
        </Button>
      </Box>

      {campaigns.map((campaign) => (
        <CardCampaign
          key={campaign.id}
          handleOpen={handleOpen}
          handleDelete={handleDelete}
          campaign={campaign}
        />
        ))}

      <Modal
        open={open}
        onClose={handleClose}
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
          {selectedCampaign && (
            <>
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
                  <strong style={{ color: "#dd0000" }}>
                    {errors.title.message}
                  </strong>
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
                <InputLabel htmlFor="outlined-adornment-local">
                  Local
                </InputLabel>
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
                  <strong style={{ color: "#dd0000" }}>
                    {errors.local.message}
                  </strong>
                )}
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-startDate">
                  Data de início
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-startDate"
                  type={"text"}
                  {...register("startDate", {
                    required: "Data de início é obrigatória",
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  }
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
                <InputLabel htmlFor="outlined-adornment-end">
                  Data limite da campanha
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-endDate"
                  type={"text"}
                  {...register("endDate", {
                    required: "Data limite da campanha",
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  }
                  label="Data limite"
                  sx={{ bgcolor: "#E8F0FE" }}
                />
                {errors.endDate && (
                  <strong style={{ color: "#dd0000" }}>
                    {errors.endDate.message}
                  </strong>
                )}
              </FormControl>
            </>
          )}
          <Button onClick={handleSubmit(updateCampaign)}>Salvar</Button>
          <Button onClick={handleClose}>X</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Campaign;
