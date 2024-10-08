import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import NewsCard from "components/molecules/news-card";
import { newsAsync, newsReset } from "./news-slice";
import { useAppDispatch, useAppSelector } from "store";
import NewsCategoryToggleButton, {
  NewsCategoryToggleButtonProps,
} from "components/organisms/news-category-toggle-buttons";
import { ToggleItem } from "components/atoms/toggle-buttons";
import NewsFromToDatePicker from "components/organisms/news-from-to-date-picker";
import NewsSourcesSelect from "components/organisms/news-sources-select";
import NewsKeywordTextfield from "components/organisms/news-keyword-textfield";
import NewsSearchButton from "components/organisms/news-search-button";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent, Typography } from "@mui/material";
import { NewsSources } from "common/types/news-sources.type";
import { NewsSearchParams } from "common/types/news-search-params.type";
import NewsCardSkeleton from "components/molecules/news-card-skeleton";
import NewsAuthorTextfield from "components/organisms/news-author-textfield";

type InitialState = {
  category: Pick<NewsCategoryToggleButtonProps, "selected">["selected"];
  to: Dayjs | null;
  from: Dayjs | null;
  keyword: string;
  source: NewsSources;
  author: string;
};

const initialState: InitialState = {
  category: undefined,
  to: dayjs(),
  from: dayjs().subtract(1, "week"),
  keyword: "",
  source: "All",
  author: "",
};

const NewsFeed = memo(() => {
  //* States
  const [state, setState] = useState<InitialState>(initialState);

  const dispatch = useAppDispatch();
  const { news, status, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    onSearchNews();
  }, []);

  const onSearchNews = () => {
    const params: NewsSearchParams = {
      to: state.to ?? null,
      from: state.from ?? null,
      keyword: state.keyword ?? null,
      category: state.category ?? null,
      author: state.author ?? null,
      limit: 40,
    };
    dispatch(newsReset());
    dispatch(newsAsync({ params, source: state.source }));
  };

  //* //////////////////////// On Changes///////////////////////////////////////
  const onChangeFromValue = useCallback(
    (from: Dayjs | null) => {
      setState((prev) => ({ ...prev, from }));
    },
    [state.from]
  );

  const onChangeToValue = useCallback(
    (to: Dayjs | null) => {
      setState((prev) => ({ ...prev, to }));
    },
    [state.to]
  );

  const onChangeNewsCategory = useCallback(
    (item: Pick<NewsCategoryToggleButtonProps, "selected">["selected"]) => {
      setState((prevState) => ({
        ...prevState,
        category: state.category?.value === item?.value ? undefined : item,
      }));
    },
    [state.category]
  );

  const onChangeSource = useCallback(
    (event: SelectChangeEvent<any>) => {
      setState((prev) => ({
        ...prev,
        source: event.target.value as NewsSources,
      }));
    },
    [state.source]
  );

  const onChangeKeyword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({ ...prev, keyword: event.target.value }));
    },
    [state.keyword]
  );

  const onChangeAuthor = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({ ...prev, author: event.target.value }));
    },
    [state.author]
  );
  //* //////////////////////////////////////////////////////////////////////////

  const renderLayout = () => {
    if (status === "loading") {
      return new Array(6).fill("").map(() => (
        <Grid item xs={12} md={6}>
          <NewsCardSkeleton />
        </Grid>
      ));
    } else if (news.length) {
      return news.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <NewsCard news={item} />
        </Grid>
      ));
    }
    return (
      <Grid item xs={12}>
        <Typography className="text-lg font-bold text-center mt-10">
          No result
        </Typography>
      </Grid>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <NewsKeywordTextfield
          onChange={onChangeKeyword}
          value={state.keyword}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <NewsAuthorTextfield onChange={onChangeAuthor} value={state.author} />
      </Grid>
      <Grid item xs={12} md={6}>
        <NewsSourcesSelect onChange={onChangeSource} value={state.source} />
      </Grid>

      <Grid item xs={12} md={6}>
        <NewsFromToDatePicker
          onChangeFrom={onChangeFromValue}
          onChangeTo={onChangeToValue}
          from={state.from}
          to={state.to}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <NewsCategoryToggleButton
          onChange={onChangeNewsCategory}
          selected={state.category}
        />
      </Grid>

      <Grid item xs={12}>
        <NewsSearchButton onClick={onSearchNews} />
      </Grid>

      {renderLayout()}
    </Grid>
  );
});

export default NewsFeed;
