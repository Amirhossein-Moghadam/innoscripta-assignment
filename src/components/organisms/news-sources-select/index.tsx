import { SelectProps } from "@mui/material";
import { NewsSources } from "common/types/news-sources.type";
import InnoscriptaSelect, { SelectItem } from "components/atoms/select";
import { FC } from "react";

type NewsSourcesSelectProps = {
  onChange: Pick<SelectProps, "onChange">["onChange"];
  value: NewsSources;
};

const NewsSourcesSelect: FC<NewsSourcesSelectProps> = ({ onChange,value }) => {
  const selectItems: SelectItem<string, NewsSources>[] = [
    { label: "All", value: "All" },
    { label: "Guardian", value: "Guardian" },
    { label: "New York Times", value: "New York Times" },
    { label: "News API", value: "News API" },
  ];

  return (
    <InnoscriptaSelect
      selectItems={selectItems}
      fullWidth
      label="Sources"
      onChange={onChange}
      value={value}
    />
  );
};

export default NewsSourcesSelect;
