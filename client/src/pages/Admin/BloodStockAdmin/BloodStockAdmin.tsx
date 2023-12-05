import BloodStockHeader from "@/components/BloodStockHeader/BloodStockHeader";
import { Box, Button, Typography } from "@mui/material";

const BloodStockAdmin = () => {
  return (
    <Box width={"100vw"}>
      <BloodStockHeader />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={2}
        gap={2}
      >
        <Typography sx={{ color: "#fff", fontSize: "25px" }}>
          Selecione um tipo de sangue para gerenciar
        </Typography>
        <Box
          sx={{
            width: "1053px",
            borderRadius: "23px",
            border: "1px solid #D9D3C7",
            background: "rgba(255, 255, 255, 0.20)",
            padding: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Typography>Tipo:</Typography>
            <Typography fontSize={25} fontWeight={"bold"}>
              Número de bolsas:
            </Typography>
            <Typography fontSize={25} fontWeight={"bold"}>
              Nível:
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Typography>A+</Typography>
            <Typography fontSize={25} fontWeight={"bold"}>
              {369}
            </Typography>
            <Typography fontSize={25} fontWeight={"bold"}>
              {"Estável"}
            </Typography>
          </Box>
        </Box>
        <Button variant="contained">Adicionar</Button>
      </Box>
    </Box>
  );
};

export default BloodStockAdmin;
