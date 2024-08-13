import { NewYorkTimesNews } from "common/types/news-new-york-times.type";
import { News } from "common/types/news.type";

export const newYorkTimesNewsConverter = (news: NewYorkTimesNews): News => {
  const {
    title,
    multimedia,
    url,
    abstract,
    published_date,
    subsection,
    byline,
  } = news;
  return {
    title,
    imageUrl: multimedia?.[1]?.url ?? "/new-york-times.svg",
    content: abstract,
    publishedAt: published_date,
    url,
    publisher: "New York Times",
    category: subsection,
    author: byline,
  };
};
