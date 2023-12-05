import { Box, Button, Grid, Typography } from "@mui/material";

import styles from "./bloodLevel.module.css";
interface IProps {
  tipo: string;
  nivel: number;
  onClick?: () => void;
}

function getStatus(numero: number) {
  if (numero < 5) {
    return "Critico";
  } else if (numero <= 10) {
    return "Alerta";
  } else if (numero <= 15) {
    return "Estavel";
  } else if (numero <= 20) {
    return "Adequado";
  }
}

const BloodLevel = ({ tipo, nivel }: IProps) => {
  const status = getStatus(nivel);

  return (
    <Button onClick={() => console.log("Click")}>
      <Grid key={tipo} item>
        <Box className={styles.container}>
          <Typography color={"white"} fontWeight={700} fontSize={20}>
            {tipo}
          </Typography>
          <img src={`src/assets/${status}.png`} />
          <Typography color={"white"} fontWeight={600} fontSize={16} mt={1}>
            {status}
          </Typography>
        </Box>
      </Grid>
    </Button>
  );
};

export default BloodLevel;
