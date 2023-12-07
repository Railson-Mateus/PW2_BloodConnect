import { useAuth } from "@/hooks/useAuth" 
import {api} from "@/api/axios"
import { Box, Typography, Card, CardContent, 
CardActions, Button, CardMedia, Modal, TextField} from "@mui/material"
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import campaign from "../../../assets/campaign.png"
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import React from "react";

const Campaign = () => {
    const { user } = useAuth()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
return (
    <Box>
    <Box sx={{ marginLeft: 15, marginTop: 2, width: 130, marginBottom: 0 }}>
      <img src={campaign} alt="imagem de campanha"></img>
    </Box>

    <Button sx={{color:"white"}} onClick={handleOpen}><AddCircleIcon sx={{}}/></Button>
    <Typography sx={{ fontSize: 40, color: "white", fontStyle: "bold", textAlign: "center", marginLeft: 40, marginTop: -10 }}>
      DOE RECOMEÇOS, DOE SANGUE!
    </Typography>

  <Box>
  <Card sx={{width: 500,height:300, marginLeft:20, marginTop:10,backgroundColor:"rgba(217,217,217,0.2)" }}>
    <DeleteIcon  sx={{float:"right", marginTop:1}}/>
    <Button sx={{color:"black"}} onClick={handleOpen}><CreateIcon sx={{float:"right", marginTop:1}}/></Button>
      <CardMedia 
        component="img"
        sx={{marginTop:2,objectFit:"contain", height: 140 }}
        image="./src/assets/campaign.png"
        title="imagem-hemonucleo"
        >
      </CardMedia>
      <CardContent sx={{display:"flex", flexDirection:"column",color:"white"}}>
        <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center"}}>
          Hemonúcleo de Cajazeiras
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{color:"white"}}>
          27 de setembro das 10h às 11h,
          Bairro Centro, no hemonúcleo de Cajazeiras - PB
        </Typography>
      </CardContent>
    </Card>
    </Box>
    <Box>
    
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
    <TextField id="filled-basic" label="Nome do hemonúcleo" variant="filled" />
    <TextField id="filled-basic" label="Endereço" variant="filled" />
    <TextField id="filled-basic" label="Horário de funcionamento" variant="filled" />
    <Button onClick={handleOpen}>Salvar</Button>
  </Box>
</Modal>
    </Box>
    </Box>
)
};


export default Campaign;