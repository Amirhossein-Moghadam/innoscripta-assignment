import { NewsAPISearchParams } from "common/types/api-search-params/news-news-api-search-params.type";
import { NewsSearchParams } from "common/types/news-search-params.type";

export const newsAPIParamsConverter = (
  params: NewsSearchParams
): NewsAPISearchParams => {
  const { category, from, keyword, to, limit, author } = params;

  const q = [
    keyword ? keyword : undefined,
    author ? `${encodeURIComponent(author)}` : undefined,
  ]
    .filter(Boolean)
    .join("+");

  return {
    apiKey: process.env.REACT_APP_NEWS_API_API_KEY as string,
    q,
    from: from ? from.format("YYYY-MM-DD") : undefined,
    to: to ? to.format("YYYY-MM-DD") : undefined,
    category:
      category && !Boolean(keyword) ? category.supported.NewsAPI : undefined,
    pageSize: limit,
    language: keyword ? undefined : "en",
  };
};
