import { useAuth } from "@/hooks/useAuth" 
import {api} from "@/api/axios"
import { Box, Typography, Card, CardContent, 
CardActions, Button, CardMedia, Modal} from "@mui/material"
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import campaign from "../../../assets/campaign.png"
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

const Campaign = () => {
    const { user } = useAuth()
return (
    <Box>
    <Box sx={{ marginLeft: 15, marginTop: 2, width: 130, marginBottom: 0 }}>
      <img src={campaign} alt="imagem de campanha"></img>
    </Box>

    <AddCircleIcon sx={{float:"right"}}/>

    <Typography sx={{ fontSize: 40, color: "white", fontStyle: "bold", textAlign: "center", marginLeft: 40, marginTop: -10 }}>
      DOE RECOMEÇOS, DOE SANGUE!
    </Typography>

  <Box>
  <Card sx={{width: 500,height:300, marginLeft:20, marginTop:10 }}>
    <DeleteIcon  sx={{float:"right", marginTop:1}}/>
    <CreateIcon sx={{float:"right", marginTop:1}}/>
      <CardMedia 
        component="img"
        sx={{marginTop:2,objectFit:"contain", height: 140 }}
        image="./src/assets/campaign.png"
        title="imagem-hemonucleo"
        >
      </CardMedia>
      <CardContent sx={{display:"flex", flexDirection:"column"}}>
        <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center"}}>
          Hemonúcleo de Cajazeiras
        </Typography>
        <Typography variant="body2" color="text.secondary">
          27 de setembro das 10h às 11h,
          Bairro Centro, no hemonúcleo de Cajazeiras - PB
        </Typography>
      </CardContent>
    </Card>
    </Box>
    </Box>
)
};


export default Campaign;