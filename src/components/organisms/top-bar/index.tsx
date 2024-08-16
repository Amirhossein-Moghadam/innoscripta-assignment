import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const TopBar = () => {
  return (
    <Box className="w-full h-[64px] bg-[#fff] sticky top-0 z-50	shadow flex items-center justify-between">
      <Box className="flex items-center">
        <img width={60} src="/innoscripta.png" alt="logo" />
        <Typography>Innoscripta News</Typography>
      </Box>
      <Box className="mr-2">
        <Typography
          variant="body1"
          className="hidden md:block text-sm font-medium"
        >
          Code By{" "}
          <Link
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/amirhossein-moghadam-5b72811a9/"
          >
            Amirhossein Moghadam
          </Link>{" "}
          with ❤️
        </Typography>
      </Box>
    </Box>
  );
};

export default TopBar;
