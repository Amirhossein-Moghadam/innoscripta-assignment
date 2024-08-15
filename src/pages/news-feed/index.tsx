import { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import NewsCard from "components/molecules/news-card";
import { newsAsync } from "./news-slice";
import { useAppDispatch, useAppSelector } from "store";
import NewsCategoryToggleButton, {
  NewsCategoryToggleButtonProps,
} from "components/organisms/news-category-toggle-buttons";
import { ToggleItem } from "components/atoms/toggle-buttons";
import NewsFromToDatePicker from "components/organisms/news-from-to-date-picker";

const NewsFeed = () => {
  //* States
  const [selectedNewsCategory, setSelectedNewsCategory] =
    useState<Pick<NewsCategoryToggleButtonProps, "selected">["selected"]>();

  const dispatch = useAppDispatch();
  const { news, status, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    if (status === "idle") {
      dispatch(newsAsync());
    }
  }, [dispatch, status]);

  const onChangeNewsCategory = (item: ToggleItem) => {
    if (selectedNewsCategory?.value === item.value) {
      return setSelectedNewsCategory(undefined);
    }
    return setSelectedNewsCategory(item);
  };

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6}>
        <NewsFromToDatePicker />
      </Grid>

      <Grid item sm={12} md={6}>
        <NewsCategoryToggleButton
          onChange={onChangeNewsCategory}
          selected={selectedNewsCategory}
        />
      </Grid>

      {news.map((item, index) => (
        <Grid item sm={12} md={6} key={index}>
          <NewsCard news={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default NewsFeed;
