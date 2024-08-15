import { FC } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";

export type SelectItem<T, V> = {
  label: T;
  value: V;
};

export type InnoscriptaSelectProps = SelectProps & {
  selectItems: SelectItem<any, any>[];
};

const InnoscriptaSelect: FC<InnoscriptaSelectProps> = (props) => {
  return (
    <FormControl fullWidth={props.fullWidth}>
      <InputLabel id="demo-simple-select-autowidth-label">
        {props.label}
      </InputLabel>
      <Select labelId="select" id="select" {...props}>
        {props.selectItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default InnoscriptaSelect;
