import { NewYorkTimesNews } from "common/types/news-new-york-times.type";
import { News } from "common/types/news.type";

export const newYorkTimesNewsConverter = (news: NewYorkTimesNews): News => {
  const {
    abstract,
    multimedia,
    web_url,
    lead_paragraph,
    pub_date,
    section_name,
    byline,
    source,
    headline,
  } = news;
  return {
    title: headline.main,
    imageUrl: multimedia?.[0]?.url
      ? `https://www.nytimes.com/${multimedia?.[0].url}`
      : "/new-york-times.svg",
    content: lead_paragraph,
    publishedAt: pub_date,
    url: web_url,
    publisher: source,
    category: section_name,
    author: byline.original,
  };
};
