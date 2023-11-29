import { Box,Grid, Typography} from '@mui/material';

interface IProps {
    tipo: string,
    nivel: number
}
const BloodLevel = ({tipo, nivel}:IProps) => {
  return (
    <Grid key={tipo} item>
    <Box
      sx={{
        height: 140,
        width: 80,
        border: 1,
      }}
    >
        <Typography>
            {tipo}
        </Typography>
        <img src= {`@/assets/${nivel}.png`} />
        <Typography>
            {nivel}
        </Typography>
    </Box>
  </Grid>
 )}

export default BloodLevel