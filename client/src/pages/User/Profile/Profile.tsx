import {useAuth } from "@/hooks/useAuth"
import { Box, Typography, Avatar, Stack, Card, CardContent, useTheme} from "@mui/material"

const Profile = () => {
  const { user } = useAuth()
  console.log(user);
  const theme = useTheme();
  
  return (
    <Box width={"100vw"}  sx={{justifyContent:"center",alignItems:"center", display:"flex",height:"100vh", flexDirection:"column"}}>
         <Stack direction="row" spacing={1}>
         <Typography>{user?.name}</Typography>
        <Avatar alt="Débora" src="/client/assets/mulher.jpeg" />
      </Stack>
       <Card variant="outlined" sx={{justifyContent:"center",width:500, height:300, alignSelf: "center"}}>
       <CardContent>
    </CardContent>
      </Card>
      </Box>
     );
  }

export default Profile;