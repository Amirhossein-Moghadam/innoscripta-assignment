import { useEffect, useMemo, useState } from "react";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import { News } from "common/types/news.type";
import NewsCard from "components/NewsCard";
import { GuardianData } from "mocks/guardian";
import { NewYorkTimesData } from "mocks/new-york-times";
import { NewsAPIData } from "mocks/news-api";
import {
  guardianNewsConverter,
  newsAPINewsConverter,
  newYorkTimesNewsConverter,
} from "utils/news-converter";

const Landing = () => {
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
  // }, []);

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
    <Box>
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

        {GuardianData.map((news, index) => (
          <Grid item sm={12} md={6}>
            <NewsCard key={index} news={guardianNewsConverter(news)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Landing;
