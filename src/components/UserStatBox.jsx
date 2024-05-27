import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import UserProgressCircle from "./UserProgressCircle";

const UserStatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Determine colors based on increase or decrease
  const isPositive = parseFloat(increase) >= 0;
  
  const progressColor = isPositive ? colors.greenAccent[500] : colors.redAccent[500];
  const increaseColor = isPositive ? colors.greenAccent[600] : colors.redAccent[600];
  const formattedIncrease = isPositive ? `+${increase}` : increase;

  // Ensure progress is a value between 0 and 1
  const progressValue = ((Math.abs(parseFloat(increase)) / 100) > 1) ? 1 : (Math.abs(parseFloat(increase)) / 100) ;

  // if(progressValue > 1) progressValue = 1;

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <UserProgressCircle progress={progressValue} color={progressColor} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: increaseColor }}
        >
          {formattedIncrease}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserStatBox;
