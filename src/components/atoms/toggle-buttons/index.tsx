import { FC } from "react";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

export type ToggleItem = {
  value: string;
  label: string;
};

export type InnoscriptaToggleButtonsProps = {
  toggleItems: ToggleItem[];
  selected: ToggleItem | undefined;
  onChange: (item: ToggleItem) => void;
};

const InnoscriptaToggleButtons: FC<InnoscriptaToggleButtonsProps> = (props) => {
  const { selected, onChange, toggleItems } = props;

  return (
    <Grid container spacing={1}>
      {toggleItems.map((item) => (
        <Grid item>
          <Button
            className="rounded-3xl text-[11px] py-1 py-0"
            variant="outlined"
            key={item.value}
            startIcon={selected?.value === item.value && <CheckIcon />}
            onClick={() => onChange(item)}
          >
            {item.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default InnoscriptaToggleButtons;
