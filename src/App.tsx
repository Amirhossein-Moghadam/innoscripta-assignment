import { Grid } from "@mui/material";
import axios from "axios";
import { News } from "common/types/news.type";
import NewsCard from "components/NewsCard";
import { NewYorkTimesData } from "mocks/new-york-times";
import { NewsAPIData } from "mocks/news-api";
import { useEffect, useMemo, useState } from "react";
import {
  newsAPINewsConverter,
  newYorkTimesNewsConverter,
} from "utils/news-converter";

const App = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://content.guardianapis.com/search?api-key=${process.env.REACT_APP_GUARDIAN_API_KEY}`
  //     )
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  //* News API
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_API_KEY}`
  //     )
  //     .then((value) => {
  //       // console.log("Value", value);
  //       setData(value.data.articles);
  //     })
  //     .catch((reason) => {
  //       console.log(reason);
  //     });
  // },[]);

  //* New York Times
  // axios
  //   .get(
  //     `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_NEW_YORK_TIMES_API_KEY}`
  //   )
  //   .then((result) => {
  //     console.log(result.data.results);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // const news: News[] = useMemo(() => {
  //   newYorkTimesNewsConverter;
  //   return;
  // }, []);

  return (
    <Grid container spacing={2}>
      {NewYorkTimesData.map((news, index) => (
        <Grid item sm={12} md={6}>
          <NewsCard key={index} news={newYorkTimesNewsConverter(news)} />
        </Grid>
      ))}

      {NewsAPIData.map((news, index) => (
        <Grid item sm={12} md={6}>
          <NewsCard key={index} news={newsAPINewsConverter(news)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default App;
