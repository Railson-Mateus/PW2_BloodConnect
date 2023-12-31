import { api } from "@/api/axios";
import CardUser from "@/components/CardUser";
import { IDonation } from "@/models/Donation";
import { User } from "@/models/User";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Card, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";


const Donnors = () => {
  const [users, setUsers] = useState<User[]>([] as User[]);
  const getAllUsers = async () => {
    const response = await api.get("/user")
    setUsers(response.data)
  }

  useEffect(() => {
    getAllUsers()
  },[users])

  return (
    <>
      <Box sx={{margin:"0 auto", marginTop:"4em"}}>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
          <Typography sx={{ color: "#fff", fontSize: "25px"}}>
            Buscar doadores
          </Typography>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 800,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, width:"100px" }}
              placeholder="Pesquise por doadores neste campo"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} mt={2}>
            <Typography sx={{ color: "#fff", fontSize: "25px"}}>
                Resultados
            </Typography>
            <Box sx={{ width: "1053px", borderRadius: "23px", border: "1px solid #D9D3C7", background: "rgba(255, 255, 255, 0.20)", padding: 2}}>
                {
                  users.map((user) => {
                    return <CardUser id={user.id} nome={user.name} typeBlood={user.bloodType} imageUrl={user.photo}/>
                  })  
                }
            </Box>
        </Box>
      </Box>
    </>
  );
};
export default Donnors
