import { GuardianSearchParams } from "common/types/api-search-params/news-guardian-search-params.type";
import { NewsSearchParams } from "common/types/news-search-params.type";

export const guardianParamsConverter = (
  params: NewsSearchParams
): GuardianSearchParams => {
  const { category, from, keyword, to, limit } = params;
  return {
    "api-key": process.env.REACT_APP_GUARDIAN_API_KEY as string,
    q: keyword ? keyword : undefined,
    "from-date": from ? from.format("YYYY-MM-DD") : undefined,
    "to-date": to ? to.format("YYYY-MM-DD") : undefined,
    section: category ? category.supported.Guardian : undefined,
    "page-size": limit,
  };
};
