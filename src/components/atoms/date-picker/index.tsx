import { FC } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./index.css";

const InnoscriptaDatePicker: FC<any> = (props) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      {...props}
      format="YYYY/MM/DD"
      slotProps={{
        textField: {
          fullWidth: true,
        },
        field: { clearable: true },
      }}
    />
  </LocalizationProvider>
);

export default InnoscriptaDatePicker;
