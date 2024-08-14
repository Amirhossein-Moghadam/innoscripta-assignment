import Box from "@mui/material/Box";
import TopBar from "components/organisms/top-bar";
import { Outlet } from "react-router";

const MainLayout = (props: any) => {
  return (
    <Box>
      <TopBar />
      <Box className="py-8 px-4 bg-[#f7f7f7]">
        <Box sx={{ maxWidth: "1280px", margin: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
