import { FC } from "react";
import Grid from "@mui/material/Grid";
import InnoscriptaDatePicker from "components/atoms/date-picker";
import { Dayjs } from "dayjs";

type NewsFromToDatePickerProps = {
  onChangeFrom: (from: Dayjs | null) => void;
  onChangeTo: (to: Dayjs | null) => void;
  from: Dayjs | null;
  to: Dayjs | null;
};

const NewsFromToDatePicker: FC<NewsFromToDatePickerProps> = ({
  onChangeFrom,
  onChangeTo,
  from,
  to,
}) => (
  <Grid container columnSpacing={2}>
    <Grid item xs={6}>
      <InnoscriptaDatePicker
        label="From"
        onChange={onChangeFrom}
        value={from}
      />
    </Grid>
    <Grid item xs={6}>
      <InnoscriptaDatePicker label="To" onChange={onChangeTo} value={to} />
    </Grid>
  </Grid>
);

export default NewsFromToDatePicker;
