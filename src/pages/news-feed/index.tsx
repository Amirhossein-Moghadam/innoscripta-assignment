import { MouseEvent, useEffect, useMemo, useState } from "react";
import { Box, Grid } from "@mui/material";
import NewsCard from "components/NewsCard";
import { newsAsync } from "./news-slice";
import { useAppDispatch, useAppSelector } from "store";
import NewsCategoryToggleButton, {
  NewsCategoryToggleButtonProps,
} from "components/organisms/news-category-toggle-buttons";
import { ToggleItem } from "components/atoms/toggle-buttons";

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
    <Box>
      <NewsCategoryToggleButton
        onChange={onChangeNewsCategory}
        selected={selectedNewsCategory}
      />
      <Grid container spacing={2}>
        {news.map((item, index) => (
          <Grid item sm={12} md={6} key={index}>
            <NewsCard news={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewsFeed;
