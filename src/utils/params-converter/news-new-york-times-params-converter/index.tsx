import { NewYorkTimesSearchParams } from "common/types/api-search-params/news-new-york-times-search-params.type";
import { NewsSearchParams } from "common/types/news-search-params.type";

export const newYorkTimesParamsConverter = (
  params: NewsSearchParams
): NewYorkTimesSearchParams => {
  const { category, from, keyword, to, limit } = params;
  return {
    "api-key": process.env.REACT_APP_NEW_YORK_TIMES_API_KEY as string,
    q: keyword ? keyword : undefined,
    begin_date: from ? from.format("YYYYMMDD") : undefined,
    end_date: to ? to.format("YYYYMMDD") : undefined,
    fq: category ? `section_name:(${category.supported.NYT})` : undefined,
  };
};
