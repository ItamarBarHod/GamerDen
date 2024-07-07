import React, { ReactNode } from "react";
import { Box } from "@mui/material";

type BackgroundProps = {
  children: ReactNode;
};

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <Box
      style={{
        backgroundImage: `url('/public/background1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {children}
    </Box>
  );
};

export default Background;
