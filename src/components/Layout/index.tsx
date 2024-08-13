import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Outlet } from "react-router";

const Layout = (props: any) => {
  return (
    <Box>
      <Box className="w-full h-[64px] bg-[#fff] sticky top-0 z-50	">
        <Box className="flex items-center">
          <img width={60} src="/innoscripta.png" alt="logo" />
          <Typography>Innoscripta News</Typography>
        </Box>
      </Box>
      <Box className="py-8 px-4 bg-[#f7f7f7]">
        <Box sx={{ maxWidth: "1280px", margin: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
