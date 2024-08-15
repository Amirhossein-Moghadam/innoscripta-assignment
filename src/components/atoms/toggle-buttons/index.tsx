import { FC } from "react";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

export type ToggleItem = {
  value: string;
  label: string;
};

export type InnoscriptaToggleButtonsProps<T> = {
  toggleItems: T[];
  selected: T | undefined;
  onChange: (item: T) => void;
};

const InnoscriptaToggleButtons = <T,>(
  props: InnoscriptaToggleButtonsProps<T>
) => {
  const { selected, onChange, toggleItems } = props;

  return (
    <Grid container spacing={1}>
      {toggleItems.map((item) => (
        <Grid item key={(item as ToggleItem).value}>
          <Button
            className={`rounded-3xl text-[12px] px-1 py-0 ${
              (selected as ToggleItem)?.value === (item as ToggleItem).value &&
              "font-bold border-2 border-warn text-warn"
            }`}
            variant="outlined"
            onClick={() => onChange(item as any)}
          >
            {(item as ToggleItem).label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default InnoscriptaToggleButtons;
