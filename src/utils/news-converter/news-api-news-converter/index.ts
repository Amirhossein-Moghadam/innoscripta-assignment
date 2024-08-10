import { NewsAPINews } from "common/types/news-news-api.type";
import { News } from "common/types/news.type";

export const newsAPINewsConverter = (news: NewsAPINews): News => {
  const { publishedAt, title, content, author, urlToImage, url, source } = news;
  return {
    author,
    category: null,
    content,
    imageUrl: urlToImage,
    publishedAt,
    publisher: source.name,
    title,
    url,
  };
};
