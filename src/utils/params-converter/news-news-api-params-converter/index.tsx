import { NewsAPISearchParams } from "common/types/api-search-params/news-news-api-search-params.type";
import { NewsSearchParams } from "common/types/news-search-params.type";

export const newsAPIParamsConverter = (
  params: NewsSearchParams
): NewsAPISearchParams => {
  const { category, from, keyword, to, limit } = params;
  return {
    apiKey: process.env.REACT_APP_NEWS_API_API_KEY as string,
    q: keyword ? keyword : undefined,
    from: from ? from.format("YYYY-MM-DD") : undefined,
    to: to ? to.format("YYYY-MM-DD") : undefined,
    category:
      category && !Boolean(keyword) ? category.supported.NewsAPI : undefined,
    pageSize: limit,
    language: keyword ? undefined : "en",
  };
};
