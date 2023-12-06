import { useAuth } from "@/hooks/useAuth" 
import {api} from "@/api/axios"
import { Box, Typography, Card, CardContent, 
CardActions, Button} from "@mui/material"
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import campaign from "../../../assets/campaign.png"
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Campaign = () => {
    const { user } = useAuth()
return (
    <Box>
    <Box sx={{marginLeft:15, marginTop:2, width:130, marginBottom:0}}>
    <img src={campaign} alt="imagem de campanha"></img>
    </Box>
    <Typography sx={{fontSize:40, color:"white",fontStyle:"bold",textAlign:"center", marginLeft:40,marginTop:-10}}>
        DOE RECOMEÇOS, DOE SANGUE!
    </Typography>
    <Card sx={{width: 500, height: 250,alignItems:"center", marginTop:5,marginLeft:15,bgcolor:"rgba(217,217,217,0.4)",
    borderRadius:5,border:"solid", borderColor:"white"}}>
      <CardContent sx={{marginTop:3, textAlign:"right"}}>
        <Typography variant="h5" component="div" sx={{fontSize:20}}>
        <CalendarMonthIcon></CalendarMonthIcon>27 de setembro das 10h às 11h
        </Typography>
        <Typography variant="h5" component="div" marginTop={1} sx={{fontSize:20}}>
        <PlaceIcon></PlaceIcon>Bairro Centro, no hemonúcleo <br></br> de Cajazeiras - PB
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
    </Box>
)
};


export default Campaign;