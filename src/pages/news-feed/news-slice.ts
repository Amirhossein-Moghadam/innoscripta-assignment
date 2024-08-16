import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIS_URL } from "common/apis-url";
import { GuardianNews } from "common/types/news-guardian.type";
import { NewYorkTimesNews } from "common/types/news-new-york-times.type";
import { NewsAPINews } from "common/types/news-news-api.type";
import { NewsSearchParams } from "common/types/news-search-params.type";
import { NewsSources } from "common/types/news-sources.type";
import { News } from "common/types/news.type";
import services from "services";
import {
  guardianNewsConverter,
  newsAPINewsConverter,
  newYorkTimesNewsConverter,
} from "utils/news-converter";
import {
  guardianParamsConverter,
  newsAPIParamsConverter,
  newYorkTimesParamsConverter,
} from "utils/params-converter";

type NewsState = {
  news: News[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: NewsState = {
  news: [],
  status: "idle",
  error: null,
};

export type NewsAsyncOptions = {
  source: NewsSources;
  params: NewsSearchParams;
};

export const newsAsync = createAsyncThunk<News[], NewsAsyncOptions>(
  "news/newsAsync",
  async (options) => {
    const { source, params } = options;
    const requests: Promise<News>[] = [];

    //* //////////////////////// Request ///////////////////////////////////////
    if (source === "All" || source === "New York Times") {
      requests.push(
        services({
          url: APIS_URL.NEW_YORK_TIMES_URL,
          params: newYorkTimesParamsConverter(params),
        }).then(({ response }) =>
          response?.docs
            ? response.docs.map((news: NewYorkTimesNews) =>
                newYorkTimesNewsConverter(news)
              )
            : []
        )
      );
    }

    if (source === "All" || source === "Guardian") {
      requests.push(
        services({
          url: APIS_URL.GUARDIAN_URL,
          params: guardianParamsConverter(params),
        }).then(({ response }) =>
          response
            ? response.results.map((news: GuardianNews) =>
                guardianNewsConverter(news)
              )
            : []
        )
      );
    }

    if (source === "All" || source === "News API") {
      requests.push(
        services({
          url:
            Boolean(params.keyword) || Boolean(params.author)
              ? APIS_URL.NEWS_API_URL_EVERYTHING
              : APIS_URL.NEWS_API_URL_HEAD_LINES,
          params: newsAPIParamsConverter(params),
        }).then(({ articles }) =>
          articles
            ? articles.map((news: NewsAPINews) => newsAPINewsConverter(news))
            : []
        )
      );
    }

    const responses = await Promise.all(requests);
    return responses.flat();
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    newsReset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(newsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { newsReset } = newsSlice.actions;

export default newsSlice.reducer;
