import { FC } from "react";
import InnoscriptaToggleButtons, {
  InnoscriptaToggleButtonsProps,
  ToggleItem,
} from "components/atoms/toggle-buttons";
import Grid from "@mui/material/Grid";
import { NewsCategory } from "common/types/news-category.type";

export type NewsCategoryToggleButtonProps = {
  onChange: Pick<
    InnoscriptaToggleButtonsProps<ToggleItem & NewsCategory>,
    "onChange"
  >["onChange"];
  selected:
    | Pick<
        InnoscriptaToggleButtonsProps<ToggleItem & NewsCategory>,
        "selected"
      >["selected"]
    | undefined;
};

const NewsCategoryToggleButton: FC<NewsCategoryToggleButtonProps> = ({
  onChange,
  selected,
}) => {
  const toggleItems: (NewsCategory & ToggleItem)[] = [
    {
      label: "Health",
      value: "health",
      supported: {
        NYT: "health",
        Guardian: "health",
        NewsAPI: "health",
      },
    },
    {
      label: "Business",
      value: "business",
      supported: {
        NYT: "business",
        Guardian: "business",
        NewsAPI: "business",
      },
    },
    {
      label: "Technology",
      value: "technology",
      supported: {
        NYT: "technology",
        Guardian: "technology",
        NewsAPI: "technology",
      },
    },
    {
      label: "Sports",
      value: "sports",
      supported: {
        NYT: "sports",
        Guardian: "sport",
        NewsAPI: "sports",
      },
    },
    {
      label: "Science",
      value: "science",
      supported: {
        NYT: "science",
        Guardian: "science",
        NewsAPI: "science",
      },
    },
    {
      label: "Politics",
      value: "politics",
      supported: {
        NYT: "politics",
        Guardian: "politics",
        NewsAPI: "politics",
      },
    },
  ];
  return (
    <Grid container className="h-full flex items-center">
      <InnoscriptaToggleButtons
        toggleItems={toggleItems}
        onChange={onChange}
        selected={selected}
      />
    </Grid>
  );
};

export default NewsCategoryToggleButton;
