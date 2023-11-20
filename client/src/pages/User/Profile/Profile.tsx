import { useAuth } from "@/hooks/useAuth"
import {api} from "@/api/axios"
import { Box, Typography, Avatar, Stack, Card, CardContent} from "@mui/material"
import { useEffect } from "react";
import { useTheme } from "@emotion/react";

const Profile = () => {
  const { user } = useAuth()

  const getLastDonation = async () => {
    const response = await api.get(`/${user?.id}/latest-donation`)

    console.log(response)
  }

  useEffect(() => {
    getLastDonation()
    // console.log(lastDonation);
    
  }, [])
  
  return (
    <Box width={"100vw"}  sx={{justifyContent:"center",alignItems:"center", display:"flex",height:"100vh", flexDirection:"column"}}>
         <Stack direction="column" spacing={1} alignItems={"center"} marginBottom={3} >
        <Avatar sx={{
          width: 100, heitgh: 100, "& .MuiAvatar-img": {
           objectFit: "contain"
         }}} alt="Débora Camilly" src="./src/assets/homem.png"/>
         <Typography sx={{fontSize:30}}>{user?.email}</Typography>
      </Stack>
       <Card variant="outlined" sx={{justifyContent:"center",width:800, height:500, alignSelf: "center", borderRadius:5, bgcolor:"rgba(217,217,217,0.4)"}}>
       <CardContent sx={{}}>
       <Typography sx={{margimTop:10,textAlign:"center", fontSize:40, fontStyle:"italic", marginBottom:5}}>
        Tipo Sanguíneo: {user?.bloodType}
        </Typography>

       <Typography sx={{fontSize:30}}>
        Nome: {user?.name}
        </Typography>

        <Typography sx={{fontSize:30}}>
        Gênero: {user?.gender}
        </Typography>

        <Typography sx={{fontSize:30}}>
        Telefone: {user?.phone}
        </Typography>

       <Typography sx={{fontSize:30}}>
       Data de Nascimento:  
       </Typography>

       <Typography sx={{fontSize:30}}>
        Última doação: 
        </Typography>

       <Typography sx={{fontSize:30}}>
        Próxima doação: 
        </Typography>
    </CardContent>
      </Card>
      </Box>
     );
  }

export default Profile;