import Box from "@mui/material/Box";
import TopBar from "components/organisms/top-bar";
import { Outlet } from "react-router";

const MainLayout = (props: any) => {
  return (
    <Box>
      <TopBar />
      <Box className="py-8 px-4">
        <Box className="max-w-[1280px] m-auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
