import { Dayjs } from "dayjs";
import { NewsCategory } from "./news-category.type";

export type NewsSearchParams = {
  category: NewsCategory | null;
  to: Dayjs | null;
  from: Dayjs | null;
  keyword: string | null;
  limit: number;
};
