export type NewsAPISearchParams = {
  apiKey: string;
  q?: string;
  from?: string;
  to?: string;
  pageSize?: number;
  category?: string;
  language?: string;
  author?: string;
};
