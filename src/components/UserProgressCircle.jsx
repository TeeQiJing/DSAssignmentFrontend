import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const UserProgressCircle = ({ progress = "0.75", size = "40", color }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  const progressColor = color || colors.primary[400];
  
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(${progressColor} 0deg ${angle}deg, ${colors.blueAccent[900]} ${angle}deg 360deg),
            ${colors.primary[400]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />

  //   <Box
  //   sx={{
  //     background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
  //         conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[900]} ${angle}deg 360deg),
  //         ${colors.greenAccent[500]}`,
  //     borderRadius: "50%",
  //     width: `${size}px`,
  //     height: `${size}px`,
  //   }}
  // />
  );
};

export default UserProgressCircle;