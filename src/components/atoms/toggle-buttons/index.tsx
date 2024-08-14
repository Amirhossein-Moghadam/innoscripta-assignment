import { FC } from "react";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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
    <Box className="flex">
      {toggleItems.map((item) => (
        <Button
          className="!mx-2 !rounded-3xl !text-[11px] !px-2 !py-1"
          variant="outlined"
          key={item.value}
          startIcon={selected?.value === item.value && <CheckIcon />}
          onClick={() => onChange(item)}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
};

export default InnoscriptaToggleButtons;
