import { Box, Card, CardContent, Typography } from "@mui/material";
import { ReactNode } from "react";

interface IProps {
  title: string;
  total: number;
  children: ReactNode;
}

const CardComponent = ({ title, total, children }: IProps) => {
  return (
    <Card sx={{ width: 252, height: 158 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box
          width={204}
          sx={{ display: "flex", justifyContent: "space-between" }}
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
  );
};

export default CardComponent;
