import { Box, Grid, Typography } from "@mui/material"
import styles from "./BloodStockHeader.module.css"
import BloodLevel from "../BloodLevel"
import { useEffect, useState } from "react"
import { IDonation } from "@/models/Donation"
import { api } from "@/api/axios"

const BloodStockHeader = () => {
  const [donnations, setDonnations] = useState<IDonation[]>()
  const getDonnations = async ()=>{
    const response = await api.get("/donnations");
    setDonnations(response.data);
  }

  useEffect(()=>{
    getDonnations();
  },[])

  return (
    <Box height={"34%"} className={styles.header}>
    <Box width={"23%"} sx={{ padding: 2 }}>
      <Typography color={"#fff"} fontSize={20} fontWeight={600}>
        Estoque de
      </Typography>
      <Typography color={"#fff"} fontSize={46} fontWeight={700}>
        Sangue
      </Typography>
      <Typography color={"#fff"} fontSize={14}>
        Estoque atualizado em: {"00/00/00"}
      </Typography>
    </Box>
    <Grid container width={"77%"}>
      <Grid
        container
        justifyContent="center"
        alignItems={"center"}
        spacing={2}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => (   
          <BloodLevel nivel= {1} tipo="A+"/>
        ))}
      </Grid>
    </Grid>
  </Box>
  
)}

export default BloodStockHeader