import {useAuth } from "@/hooks/useAuth"
import { Box, Typography, Avatar, Stack, Card, CardContent, useTheme} from "@mui/material"

const Profile = () => {
  const { user } = useAuth()
  console.log(user);
  const theme = useTheme();
  
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
       <Typography sx={{margimTop:10,textAlign:"center", fontSize:40, fontStyle:"italic", marginBottom:5}}>{"Blood Type: "}{user?.bloodType}</Typography>
       <Typography sx={{fontSize:30}}>{"Last Donation: 00/00/00"}</Typography>
       <Typography sx={{fontSize:30}}>{"Next Donation: 00/00/00"}</Typography>
    </CardContent>
      </Card>
      </Box>
     );
  }

export default Profile;