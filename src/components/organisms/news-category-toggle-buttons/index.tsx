import { FC } from "react";
import InnoscriptaToggleButtons, {
  InnoscriptaToggleButtonsProps,
} from "components/atoms/toggle-buttons";

export type NewsCategoryToggleButtonProps = {
  onChange: Pick<InnoscriptaToggleButtonsProps, "onChange">["onChange"];
  selected:
    | Pick<InnoscriptaToggleButtonsProps, "selected">["selected"]
    | undefined;
};

const NewsCategoryToggleButton: FC<NewsCategoryToggleButtonProps> = ({
  onChange,
  selected,
}) => {
  const toggleItems = [
    {
      label: "Sport",
      value: "sport",
    },
    {
      label: "Science",
      value: "science",
    },
    {
      label: "Politics",
      value: "politics",
    },
    {
      label: "Technology",
      value: "technology",
    },
    {
      label: "Sport",
      value: "sport",
    },
    {
      label: "Science",
      value: "science",
    },
    {
      label: "Politics",
      value: "politics",
    },
    {
      label: "Technology",
      value: "technology",
    },
  ];
  return (
    <InnoscriptaToggleButtons
      toggleItems={toggleItems}
      onChange={onChange}
      selected={selected}
    />
  );
};

export default NewsCategoryToggleButton;
