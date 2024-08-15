import { Box } from "@mui/material";
import InnoscriptaDatePicker from "components/atoms/date-picker";

const NewsFromToDatePicker = () => {
  return (
    <Box className="flex items-center">
      <Box>
        <InnoscriptaDatePicker label="From"/>
      </Box>
      <Box className="ml-4">
        <InnoscriptaDatePicker label="To" />
      </Box>
    </Box>
  );
};

export default NewsFromToDatePicker;
