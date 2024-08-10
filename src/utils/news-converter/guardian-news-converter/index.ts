import { Guardian } from "common/types/news-guardian.type";
import { News } from "common/types/news.type";

export const guardianNewsConverter = (news: Guardian): News => {
  const { sectionName, webTitle, webPublicationDate, webUrl } = news;
  return {
    author: null,
    category: sectionName,
    content: null,
    imageUrl: null,
    publishedAt: webPublicationDate,
    publisher: "The Guardian",
    title: webTitle,
    url: webUrl,
  };
};
