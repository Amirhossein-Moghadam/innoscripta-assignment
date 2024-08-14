import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TopBar = () => {
  return (
    <Box className="w-full h-[64px] bg-[#fff] sticky top-0 z-50	shadow">
      <Box className="flex items-center">
        <img width={60} src="/innoscripta.png" alt="logo" />
        <Typography>Innoscripta News</Typography>
      </Box>
    </Box>
  );
};

export default TopBar;
