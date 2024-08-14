import { newYorkTimesNewsConverter } from "./new-york-times-news-converter";
import { newsAPINewsConverter } from "./news-api-news-converter";
import { guardianNewsConverter } from "./guardian-news-converter";

export {
  newYorkTimesNewsConverter,
  newsAPINewsConverter,
  guardianNewsConverter,
};


// import { newYorkTimesNewsConverter } from "./new-york-times-news-converter";
// import { newsAPINewsConverter } from "./news-api-news-converter";
// import { guardianNewsConverter } from "./guardian-news-converter";
// import { NewsSources } from "common/types/news-sources.type";
// import { NewYorkTimesNews } from "common/types/news-new-york-times.type";
// import { NewsAPINews } from "common/types/news-news-api.type";
// import { GuardianNews } from "common/types/news-guardian.type";

// type Args = {
//   type: NewsSources;
//   news: NewYorkTimesNews | NewsAPINews | GuardianNews;
// };
// const newsConverter = ({ type, news }: Args) => {
//   switch (type) {
//     case "News API":
//       return newsAPINewsConverter(news as NewsAPINews);

//     case "New York Times":
//       return newYorkTimesNewsConverter(news as NewYorkTimesNews);

//     case "Guardian":
//       return guardianNewsConverter(news as GuardianNews);
//     default:
//       break;
//   }
// };

// export default newsConverter;
