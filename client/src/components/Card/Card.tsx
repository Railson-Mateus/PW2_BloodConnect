import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";

interface IProps {
  title: string;
  total: number;
  children: ReactNode;
}

const CardComponent = ({ title, total, children }: IProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {isSmallScreen ? (
        <Card sx={{ width: 162, height: 100 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: 18, fontWeight: 400 }} gutterBottom>
                {title}
              </Typography>
              {children}
            </Box>
            <Typography sx={{ fontSize: 36, fontWeight: 700 }}>
              {total}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{
            width: "100%",
            maxWidth: 232,
            maxHeight: 158,
            height: "100%",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box
              width={"100%"}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: 22, fontWeight: 400 }} gutterBottom>
                {title}
              </Typography>
              {children}
            </Box>

            <Box>
              <Typography sx={{ fontSize: 42, fontWeight: 700 }}>
                {total}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CardComponent;
