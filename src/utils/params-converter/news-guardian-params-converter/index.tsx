import { GuardianSearchParams } from "common/types/api-search-params/news-guardian-search-params.type";
import { NewsSearchParams } from "common/types/news-search-params.type";

export const guardianParamsConverter = (
  params: NewsSearchParams
): GuardianSearchParams => {
  const { category, from, keyword, to, limit, author } = params;
  const q = [
    keyword ? keyword : undefined,
    author ? `${encodeURIComponent(author)}` : undefined,
  ]
    .filter(Boolean)
    .join("+");
  return {
    "api-key": process.env.REACT_APP_GUARDIAN_API_KEY as string,
    q,
    "from-date": from ? from.format("YYYY-MM-DD") : undefined,
    "to-date": to ? to.format("YYYY-MM-DD") : undefined,
    section: category ? category.supported.Guardian : undefined,
    "page-size": limit,
  };
};
