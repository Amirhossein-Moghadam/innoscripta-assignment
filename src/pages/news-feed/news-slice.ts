import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GuardianNews } from "common/types/news-guardian.type";
import { NewYorkTimesNews } from "common/types/news-new-york-times.type";
import { News } from "common/types/news.type";
import services from "services";
import {
  guardianNewsConverter,
  newYorkTimesNewsConverter,
} from "utils/news-converter";

type NewsState = {
  news: News[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: NewsState = {
  news: [],
  status: "idle",
  error: null,
};

export const newsAsync = createAsyncThunk<News[]>("news/newsAsync", async () => {
  const responses = await Promise.all([
    //* New York Times
    services({
      url: "https://api.nytimes.com/svc/topstories/v2/home.json",
      params: {
        "api-key": process.env.REACT_APP_NEW_YORK_TIMES_API_KEY,
      },
      method: "GET",
    }).then(({ results }) => {
      return results.map((news: NewYorkTimesNews) =>
        newYorkTimesNewsConverter(news)
      );
    }),

    //* Guardian
    services({
      url: "https://content.guardianapis.com/search",
      params: { "api-key": process.env.REACT_APP_GUARDIAN_API_KEY },
      method: "GET",
    }).then(({ response }) =>
      response.results.map((news: GuardianNews) => guardianNewsConverter(news))
    ),

    //* News API
    // services({
    //   url: "https://newsapi.org/v2/top-headlines",
    //   params: {
    //     country: "us",
    //     apiKey: process.env.REACT_APP_NEWS_API_API_KEY,
    //   },
    //   method: "GET",
    //   type: "News API",
    // }),
  ]);

  return responses.flat();
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(newsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default newsSlice.reducer;

const res = [
  {
    type: "Guardian",
    data: {
      response: {
        status: "ok",
        userTier: "developer",
        total: 2520338,
        startIndex: 1,
        pageSize: 10,
        currentPage: 1,
        pages: 252034,
        orderBy: "newest",
        results: [
          {
            id: "business/live/2024/aug/14/uk-inflation-july-rise-bank-of-england-city-house-prices-business-live",
            type: "liveblog",
            sectionId: "business",
            sectionName: "Business",
            webPublicationDate: "2024-08-14T14:22:39Z",
            webTitle:
              "US inflation falls to three-year low, as UK prices rise by less than expected – business live",
            webUrl:
              "https://www.theguardian.com/business/live/2024/aug/14/uk-inflation-july-rise-bank-of-england-city-house-prices-business-live",
            apiUrl:
              "https://content.guardianapis.com/business/live/2024/aug/14/uk-inflation-july-rise-bank-of-england-city-house-prices-business-live",
            isHosted: false,
            pillarId: "pillar/news",
            pillarName: "News",
          },
          {
            id: "sport/live/2024/aug/14/tour-de-france-femmes-2024-stage-four-takes-the-race-to-liege-live",
            type: "liveblog",
            sectionId: "sport",
            sectionName: "Sport",
            webPublicationDate: "2024-08-14T14:21:27Z",
            webTitle:
              "Tour de France Femmes 2024: Pieterse pips Vollering to stage four win in Liège – live",
            webUrl:
              "https://www.theguardian.com/sport/live/2024/aug/14/tour-de-france-femmes-2024-stage-four-takes-the-race-to-liege-live",
            apiUrl:
              "https://content.guardianapis.com/sport/live/2024/aug/14/tour-de-france-femmes-2024-stage-four-takes-the-race-to-liege-live",
            isHosted: false,
            pillarId: "pillar/sport",
            pillarName: "Sport",
          },
          {
            id: "us-news/live/2024/aug/14/harris-trump-polls-swing-states-election-updates",
            type: "liveblog",
            sectionId: "us-news",
            sectionName: "US news",
            webPublicationDate: "2024-08-14T14:17:22Z",
            webTitle:
              "Harris campaign to spend $90m on August ads as poll finds she bests Trump in most swing states – live",
            webUrl:
              "https://www.theguardian.com/us-news/live/2024/aug/14/harris-trump-polls-swing-states-election-updates",
            apiUrl:
              "https://content.guardianapis.com/us-news/live/2024/aug/14/harris-trump-polls-swing-states-election-updates",
            isHosted: false,
            pillarId: "pillar/news",
            pillarName: "News",
          },
          {
            id: "world/article/2024/aug/14/sudan-flooding-rains-civil-war-conflict-famine",
            type: "article",
            sectionId: "world",
            sectionName: "World news",
            webPublicationDate: "2024-08-14T14:17:21Z",
            webTitle:
              "At least 68 people killed in flooding as rains worsen Sudan’s plight",
            webUrl:
              "https://www.theguardian.com/world/article/2024/aug/14/sudan-flooding-rains-civil-war-conflict-famine",
            apiUrl:
              "https://content.guardianapis.com/world/article/2024/aug/14/sudan-flooding-rains-civil-war-conflict-famine",
            isHosted: false,
            pillarId: "pillar/news",
            pillarName: "News",
          },
          {
            id: "world/live/2024/aug/14/israel-gaza-war-live-us-arms-sales-israel-iran",
            type: "liveblog",
            sectionId: "world",
            sectionName: "World news",
            webPublicationDate: "2024-08-14T14:16:58Z",
            webTitle:
              "Israel-Gaza war live: Israel publishes plan for new West Bank settlement as regional tensions simmer",
            webUrl:
              "https://www.theguardian.com/world/live/2024/aug/14/israel-gaza-war-live-us-arms-sales-israel-iran",
            apiUrl:
              "https://content.guardianapis.com/world/live/2024/aug/14/israel-gaza-war-live-us-arms-sales-israel-iran",
            isHosted: false,
            pillarId: "pillar/news",
            pillarName: "News",
          },
          {
            id: "politics/live/2024/aug/14/tory-leadership-race-inflation-uk-politics-live",
            type: "liveblog",
            sectionId: "politics",
            sectionName: "Politics",
            webPublicationDate: "2024-08-14T14:11:35Z",
            webTitle:
              "Ending sexual violence on public transport is ‘absolute priority’, says minister – UK politics live",
            webUrl:
              "https://www.theguardian.com/politics/live/2024/aug/14/tory-leadership-race-inflation-uk-politics-live",
            apiUrl:
              "https://content.guardianapis.com/politics/live/2024/aug/14/tory-leadership-race-inflation-uk-politics-live",
            isHosted: false,
            pillarId: "pillar/news",
            pillarName: "News",
          },
          {
            id: "world/live/2024/aug/14/russia-ukraine-war-live-kursk-incursion-zelenskiy-putin",
            type: "liveblog",
            sectionId: "world",
            sectionName: "World news",
            webPublicationDate: "2024-08-14T14:03:36Z",
            webTitle:
              "Russia-Ukraine war: Ukraine planning evacuation corridors for civilians in Kursk, says deputy PM – as it happened",
            webUrl:
              "https://www.theguardian.com/world/live/2024/aug/14/russia-ukraine-war-live-kursk-incursion-zelenskiy-putin",
            apiUrl:
              "https://content.guardianapis.com/world/live/2024/aug/14/russia-ukraine-war-live-kursk-incursion-zelenskiy-putin",
            isHosted: false,
            pillarId: "pillar/news",
            pillarName: "News",
          },
          {
            id: "society/article/2024/aug/14/women-in-england-to-be-offered-a-daily-tablet-for-fibroids-nice-says",
            type: "article",
            sectionId: "society",
            sectionName: "Society",
            webPublicationDate: "2024-08-14T14:00:01Z",
            webTitle:
              "Women in England to be offered a daily tablet for fibroids, Nice says",
            webUrl:
              "https://www.theguardian.com/society/article/2024/aug/14/women-in-england-to-be-offered-a-daily-tablet-for-fibroids-nice-says",
            apiUrl:
              "https://content.guardianapis.com/society/article/2024/aug/14/women-in-england-to-be-offered-a-daily-tablet-for-fibroids-nice-says",
            isHosted: false,
            pillarId: "pillar/news",
            pillarName: "News",
          },
          {
            id: "technology/article/2024/aug/14/mark-zuckerberg-priscilla-chan-sculpture",
            type: "article",
            sectionId: "technology",
            sectionName: "Technology",
            webPublicationDate: "2024-08-14T13:43:53Z",
            webTitle:
              "‘Ultimate wife guy’ or ‘yikes’? Mark Zuckerberg reveals 7ft statue of wife",
            webUrl:
              "https://www.theguardian.com/technology/article/2024/aug/14/mark-zuckerberg-priscilla-chan-sculpture",
            apiUrl:
              "https://content.guardianapis.com/technology/article/2024/aug/14/mark-zuckerberg-priscilla-chan-sculpture",
            isHosted: false,
            pillarId: "pillar/news",
            pillarName: "News",
          },
          {
            id: "sport/article/2024/aug/14/head-of-panel-in-jordan-chiles-case-worked-on-cases-for-romanian-government",
            type: "article",
            sectionId: "sport",
            sectionName: "Sport",
            webPublicationDate: "2024-08-14T13:18:54Z",
            webTitle:
              "Head of panel in Jordan Chiles appeal worked on cases for Romanian government",
            webUrl:
              "https://www.theguardian.com/sport/article/2024/aug/14/head-of-panel-in-jordan-chiles-case-worked-on-cases-for-romanian-government",
            apiUrl:
              "https://content.guardianapis.com/sport/article/2024/aug/14/head-of-panel-in-jordan-chiles-case-worked-on-cases-for-romanian-government",
            isHosted: false,
            pillarId: "pillar/sport",
            pillarName: "Sport",
          },
        ],
      },
    },
  },
  {
    type: "News API",
    data: {
      status: "ok",
      totalResults: 38,
      articles: [
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "Barron's",
          title:
            "Home Depot Earnings Beat Estimates. Why the Stock Is Dropping. - Barron's",
          description: null,
          url: "https://news.google.com/rss/articles/CBMihAFBVV95cUxQZGlCbDFGaXc0eXBkSUYzUlRvVlV3a2h1ak5VZ0poRHgwbEw5QjVZSW1ONG81MElGc3RqckgyV0RsYkZZMkxiS0JIRElaaS13cUVuNlNzNkpvZ3FZZWNTNmVjTFczTENoQzg0VkM0TlFrNXhrcFhuOVZvenpXTEdQcUhaOWs?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T12:34:00Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "CNN",
          title:
            "Tropical Storm Ernesto is plowing through Caribbean islands. Here’s where it could go next. - CNN",
          description: null,
          url: "https://news.google.com/rss/articles/CBMipAFBVV95cUxOMGRKSEtKVlhzeERibkhPUHhMUU9XaVRsNXA3VXNud0t2Y2F6dXlWR2FuT1lzV3NuZm5sOUtsWVlfSVNZaXpBN090ck1randCVlNnQnFNX2RxU2o4WjBqN0FkeHExXzhxVlZXbnpTdTVRLUMtUF80VUxOTUx4WlE1UHJnTkxvRngtTktmcmJqRWJkamNodHdDVXJ6aVNRbmN3ZW9EdA?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T12:21:00Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "CNBC",
          title:
            "Starbucks replaces CEO Laxman Narasimhan with Chipotle CEO Brian Niccol - CNBC",
          description: null,
          url: "https://news.google.com/rss/articles/CBMirAFBVV95cUxOT0dZODltTnNJeVhHLXBDWVRFZEc4RUxxa0J4azl3ZHZlVHlMOXlCOHQzT2xzWDBhbzJSN0hiVWx1bGk5T21oNmJsckNJTnBVVjFPVzlmSlU4alYtZDUxWWxHQ05rdk5zOHB3UzhqVkxZRjRBNTRrNkx5SEwzYjRuRm1mQTRRcEF6MmpjWDV5eHg5alEySUowVEdGaUJBemFJUXpjczl2Y2Y1aGpw0gGyAUFVX3lxTE1IckZIV0g0Z0lNa085aHR5cHhKSXkxeDJkaTItTGRxbll2cjhhUTVaTUROYTU5d2lEUVFOaWdQVXZNcXp3MWlKenhSY3pxQnB3d0FvZmhRVHJ6MzVBNGRCdF9QQ043aWJIMktpVnpsM0VRSDJLNS1vUDFqMGZEVTR2SzRqcUVLOEl2dHpyV3Q4WEpfZHEtT3REMlE2Wk9mOEtJci1yaUNqOWNaTFBjQXFDeUE?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T12:07:16Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "Yahoo Finance",
          title:
            "Stock market today: S&P 500, Nasdaq futures point higher with key inflation data looming - Yahoo Finance",
          description: null,
          url: "https://news.google.com/rss/articles/CBMiywFBVV95cUxQQm5Fd2F6UDVpQmN5eWtiLVVydWFsbkhjZVJVSmFzbUs0UTZ6cTVfTXhRbHB4LW9kYlpUWVppNmNQLTRVandEalRrLVZueEE3aWo3aVp1S181aWNsaG5QSVJ6UFZfaUZXR3hQMjJuOGZKeG10TGhxX1lxMnJEQ0N5eGpGaHFSM2NQZTBQTVJOeEcxamJiNXprcnVHWGZsbHdHc0gzN2doYUNNci1nMzFCMEFwTWw1WlVxWF9vNEhibG5JS2VPMEdNQkJDSQ?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T12:00:22Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "9to5Google",
          title:
            "How to watch the Made by Google event stream and Pixel 9 announcement - 9to5Google",
          description: null,
          url: "https://news.google.com/rss/articles/CBMieEFVX3lxTE50MkJKdVl0ci05bTkySFl3VUlfeDlRWHNrU1F0TnJJbEJzWGtKVDF3NWRKY2w4SkhudFJwWHlMMG1zd2tEemdFMUtKbXY2TlBGaGw5VEk3a2RxU1M5dDBrNm1YV2pVM3VIdDgtWUE3TUhpZE9pVEJxbg?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T11:30:00Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "Reuters.com",
          title:
            "Russia strikes back at Ukrainian forces in Kursk region - Reuters.com",
          description: null,
          url: "https://news.google.com/rss/articles/CBMiqAFBVV95cUxPQm5JNW0yRno2MTRnY01xclRhcFdXdzFYSXVyUlFMR0VfNnNuRXAydnREWG9QZm1jVEJYV2ZreWpDRFg3Tksyc3ZINTNEVnNBdzNiWmxPOTFQWkNzRzdyZ04zOVo0Q1hseXQ0UlhxQThlbFBZQWU5ZTB2SnBOcVp4NVdYSGlMTklkdk4zcDFKazF1eGJWLXRLdUpfZWoyM3hHODZGbjNjME8?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T11:28:58Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "BBC.com",
          title:
            "Iran rejects Western calls to refrain from attack on Israel - BBC.com",
          description: null,
          url: "https://news.google.com/rss/articles/CBMiWkFVX3lxTFA0dVNjYWpiTExaVUtjUkZva0pjbkJfRkw3SUhaT0dVNENIbmg3dGdDcG5lbXRRMjdQNU5YeGE5YzEyTGJiMEVQUjhndjdoenFjMnhIR3RhOWNzd9IBX0FVX3lxTE94VmdFTkdFWXVUMUF6R29LcExMbE84RkZjQnNVOG5YS3BYellYcFQyNnNwN1ZxRHhnMXZ4SEZXLWwtalU1NHpkaG84eUd2bHZjbHJhYWtyNnBxSkxLRXR3?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T11:28:21Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "The Associated Press",
          title:
            "Biden is announcing $150 million in research grants as part of his 'moonshot' push to fight cancer - The Associated Press",
          description: null,
          url: "https://news.google.com/rss/articles/CBMioAFBVV95cUxPeU12WXk3RDd0YndiZFdKS0Vlb1FPN1ZPVGpvNkdkM1NMNTFRVlZMRG9jaVluM3hUTmhzdHBudWhhMm5wOGVzSEFIS1YzZFhSQURkLTdjbkEzTF9CUWlKdndpd1M0M3pJaUZ5TzVPV2w0bWVuVk0wSzdUWlptVHl3b0psVjc2SXFqWGFtS0hQQnY5bjI3bERxMmx3TzZKWmNB?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T11:24:00Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "The Associated Press",
          title:
            "Trump and Musk talk about assassination attempt and deportations during glitchy chat on X - The Associated Press",
          description: null,
          url: "https://news.google.com/rss/articles/CBMipgFBVV95cUxOUGIyWmxZU3ZvUzlhcm1PSVZxTXpxeVVDRmtaMVlSLUhldUUxS1RENkp4emFkMHA2c3RmZW5iTVBJZ1JraXF3b1JfNjNzUFRxQ2lxa1EyYlVYcEJnTXlWbnhMWUxOMkY3UE9KcENJMXh5TmhVOHVvYnV6Q1hWcFhXRjFfS241ZmFDTHR2TmdZbWNwMnNNdm5DejdMMC03VGNMVnJZVndR?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T11:16:00Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "ESPN",
          title:
            "Final preseason SP+ rankings for all 134 teams and poll takeaways - ESPN",
          description: null,
          url: "https://news.google.com/rss/articles/CBMivAFBVV95cUxOdE9WVVNFdXA3NURjNjJkOXR0SFlqdmdjcWllZXJuMWJEdWJ4YmJ0VGpiWnh5aUU2U1dDZG1Cb1NZaERSSndpQnY3cFNvWi1uS1h0RGZ2TGE1Mm9ob1FzalhRdG04NDFrTlVfUnVGbFlYNTdYNy1WdGZ2VFg1QXhEMG1HWGRUaS15MVpxXzJxdjc0SUFYR1R0SEJ6d0xjcjFnVXJPVG5qZDlHX3czZ2xZeDBXNU5Md21KSkdPQQ?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T11:07:00Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "Reuters.com",
          title:
            "Gaza ceasefire: Hamas says again it wants implementation, not more talks - Reuters.com",
          description: null,
          url: "https://news.google.com/rss/articles/CBMivgFBVV95cUxQYm5Sa05KNW9WYVJTdVgzY1Q1UEw1U1lxZFNwNVoxWk04c1R6T2E2MkZvaWxlRGlzSTY1NTlRLU5xSkV2YU05YW9vbFAwcHY2SjE0NnJ3emJiVlVaYlc5SVVVbW5IODVydHpqNGNUM2wwdDZ6QVVfV1ktWl9vRFFIbGZGSGlQMlRxZTA3bjdYZXZQcWlTSlZzUlNuVFVjbmZYOGs0N0tIMVZCVERja2s3UXBnNnVTcHRBX2d0bl9R?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T10:28:00Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "Financial Times",
          title:
            "Home Depot cuts sales outlook as consumer spending weakens - Financial Times",
          description: null,
          url: "https://news.google.com/rss/articles/CBMicEFVX3lxTE9TTHVoTHdlRi1mcU1vOUZwbFktbW9PX0NiUUh6bnU5aF9yYXVzZmllalBTVHJOX2xmeXRyUUF0VjZGdGg4SnNGLVZZS0dkUDlib3hEeEFZVjROaF8tVDhIaEFwSUV5ZXRvQVgtRTZuUEE?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T10:20:31Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "BBC.com",
          title:
            "Helicopter crash pilot attended their own party before flight - BBC.com",
          description: null,
          url: "https://news.google.com/rss/articles/CBMiWkFVX3lxTE5JZXB3dklqNkN3aFlGMThyMllZc3VZMzFUeWx0dmwyVTM5cm14a2dzbU5UMXVTWFdzYkIyWXBneVVBaWs4VjhncTFQWTlsRExjZHJyaW1vczF1UdIBX0FVX3lxTE9nVmV3TTluRUlZX2tmU0J1U2FLb2RxRzFUUllZblp3bWhPX2JnWnRNZG83aE1oVWJfYmRZY2FmS1VReElLTzhrbV80WEQxUXo0NFZoY1pNNUFxTVM3ZHhZ?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T09:57:19Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "Space.com",
          title:
            "Rare display of northern lights and Perseid meteor shower delights skywatchers worldwide (photos, video) - Space.com",
          description: null,
          url: "https://news.google.com/rss/articles/CBMilAFBVV95cUxPaExLcVhXbHdTd2V3SzAyeDlGY1ZaTVc2R1ZHeXlvOEtkVVZfRWhieGwtU21JRGFJRy1Gc3h2WXNNMnBoMjNST1FDb0tpV1k1QnRXTXA4Y3JtSWRrVjZ1YjJnOEdwVDhteS1XREtpR1N1MTFIQWVDRFZTbEEzdUtHaVNERE9VSl9Jd0pYV0lyZlVVck5o?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T09:46:34Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "BBC.com",
          title:
            "FBI opens probe into attempts to hack Trump campaign - BBC.com",
          description: null,
          url: "https://news.google.com/rss/articles/CBMiWkFVX3lxTE9BNXQwbXBwQ3lXRW9adzhGQ2E3Y1kweXJ2UGJEQUs2NzBTUjRGZTRobmdnSGMyNzdHcDh0dWxiYkdkNEFYb2FCRVJJazV1UkZBYTRGWlFVT0F2QdIBX0FVX3lxTE45RHR1OUg5M2dLLWF5SWpBSXJ5U3VfM2dmYUNTRkdGdU5BNkRYM0Q2aHBKU3VveF9iQ2h1bnNFZ2dudmlNWGFqWDB5LTh3ZUFFRURhSEszZ1RrLUVWVkcw?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T09:44:26Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "POLITICO",
          title: "Progressives jostle for nat sec jobs under Harris - POLITICO",
          description: null,
          url: "https://news.google.com/rss/articles/CBMikwFBVV95cUxPV19iSjBfOWg0bi1VZHo4MlFqd3ZrbTVEUFNhRXZXSFB6ZjBYTUVoVDJqcDVvclJ0Rl9ObkRhTThkUGNNNHpYZ2xpZ3FKOEYxY1hGTklza0dISWJiaUFrT3pKUHUwaExGQjJfc0RMSEVRNzRIQW1mZnpTUHV6NTRPV1dFS2gtWTVFRjRHTVhwaUU3MzQ?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T09:00:00Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "The Guardian",
          title:
            "Jordan Chiles must return bronze medal after USA Gymnastics appeal fails - The Guardian",
          description: null,
          url: "https://news.google.com/rss/articles/CBMixAFBVV95cUxPVmdVcndvWDFJZVlPb3pWSW9qYlNLZzlBeldybU1NaUI2NWlUbHBlSVBFR2JRdTVOX2xxTC1fNnZPMVhiNTdBZy1BdV9CVGZ2d2ZzdW1hSE93Z0tqbXlhbnhNeTJSVnhXMkYtNllYOUQ4UzZDQTgtbGlHNGxUXzBZdGJxZ1pZV3VuNXpianNqZm1yQzdBVFN0LThBLU5lYWM3cjRpYlY1dWRfTkdZSGV6YUxLbU9LeXJsd2U4dFB4bU81NEE4?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T08:51:00Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "Axios",
          title:
            "Trump's crowd-photo claims speed AI-driven truth decay - Axios",
          description: null,
          url: "https://news.google.com/rss/articles/CBMid0FVX3lxTE5zX2JCUDNmeUJvc3U1cDloOXVfa1Z4a1pNa0xmcDlzVi1FQWZfMzU4Rzc1WkJuR29YdlBpM1NBWTE0Y3E4M3lhWU1vRUxLTlBxRHo5S3FjSDctMEVhZE1Hd0VCQkNSd2hMMGlIMWxlYWk1SDhsMThj?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T08:14:34Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "ABC News",
          title:
            "5 diagnosed with Legionnaires' disease in New Hampshire, health officials say - ABC News",
          description: null,
          url: "https://news.google.com/rss/articles/CBMirAFBVV95cUxPN19yWHpwLU9UMzdDQzg4dUg1Rm9FLVhPb1hkX2U3Q0ZzTnRDVU1KN0pZN2hNY1VFSnFoMktKbUZEdDVzQ3lZTGF0M3Fqb1dzbU9iRzV0Qzh0Y2U2SFpkWTRKWlJVV2d2ekxmRVFiVDRRZkVIODRuSUx0eFQtZFRMb3JJdllkc2tGLXdQUER6ZkVrdWdsaDNpcjBDVzNLRXNQdzZEbFRwcVRDNmN40gGyAUFVX3lxTE9RaldlbHdYWVZjZmd4S21ua2tkUWtJRkstM05wOFBGdDdfMDJXN0pFZ1BlZmtaV0dhMzQ0WFpmaFpBN3FUa2V4VXRtZ3VDTE85dXc2bG9XQWtZNmpjUUdSaGJWNHZfWm05NnZtTXFpOUU0MFdQV3A3QUJNbm40QXVzN0dNS3Q4Wm1jYVIwY1dXc2FaTHluU0VrYmtjMXZWTkpfbnp6V3plVTJlR2I3cjdJS0E?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T07:49:04Z",
          content: null,
        },
        {
          source: {
            id: "google-news",
            name: "Google News",
          },
          author: "SamMobile - Samsung news",
          title:
            "August 2024 security update rolls out more widely to Galaxy S22 - SamMobile - Samsung news",
          description: null,
          url: "https://news.google.com/rss/articles/CBMigwFBVV95cUxORFZKdUFOay1pZWplcElBRXkzb3dObHdNUzcydGo5YVhfZ1ZEVEp2NHIwRWgzT0VhazdNVjRBdXZmaWU4YVQwU1NlODVUWWM1Q3ZmbzJtY1JLaDBuWWwxSkM0a0VHaUllUTNEbjZITUl0UVVFMjM1TDhQQS1tLXBLaVJKSQ?oc=5",
          urlToImage: null,
          publishedAt: "2024-08-13T06:24:00Z",
          content: null,
        },
      ],
    },
  },
  {
    type: "New York Times",
    data: {
      status: "OK",
      copyright:
        "Copyright (c) 2024 The New York Times Company. All Rights Reserved.",
      section: "home",
      last_updated: "2024-08-14T10:22:12-04:00",
      num_results: 24,
      results: [
        {
          section: "podcasts",
          subsection: "",
          title:
            "Abortion Access on the Ballot, and Hamas Won’t Attend Peace Talks",
          abstract: "Plus, new details on Hunter Biden’s business dealings.",
          url: "https://www.nytimes.com/2024/08/14/podcasts/abortion-arizona-hamas-peace-talks.html",
          uri: "nyt://article/936ae091-57c3-5716-8b12-629482cd7415",
          byline:
            "By Tracy Mumford, Kenneth P. Vogel, Mujib Mashal, Ian Stewart and Jessica Metzger",
          item_type: "Article",
          updated_date: "2024-08-14T09:04:21-04:00",
          created_date: "2024-08-14T06:00:09-04:00",
          published_date: "2024-08-14T06:00:09-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: [
            "Abortion",
            "Peace Process",
            "United States Politics and Government",
            "Computers and the Internet",
            "Video Recordings, Downloads and Streaming",
          ],
          org_facet: ["Apple Inc", "Hamas"],
          per_facet: ["Biden, Hunter"],
          geo_facet: [],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/14theheadlines-abortion/14theheadlines-abortion-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1639,
              width: 2048,
              type: "image",
              subtype: "photo",
              caption:
                "Abortion rights supporters in Arizona. Voters there will decide in November whether to establish a right to abortion in the state constitution.",
              copyright: "Ross D. Franklin/Associated Press",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/14theheadlines-abortion/14theheadlines-abortion-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "Abortion rights supporters in Arizona. Voters there will decide in November whether to establish a right to abortion in the state constitution.",
              copyright: "Ross D. Franklin/Associated Press",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/14theheadlines-abortion/14theheadlines-abortion-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "Abortion rights supporters in Arizona. Voters there will decide in November whether to establish a right to abortion in the state constitution.",
              copyright: "Ross D. Franklin/Associated Press",
            },
          ],
          short_url: "",
        },
        {
          section: "us",
          subsection: "politics",
          title: "Harris Is Set to Lay Out an Economic Message Light on Detail",
          abstract:
            "The vice president is expected to recalibrate President Biden’s policy themes in a bid to turn the Democratic economic agenda into an asset.",
          url: "https://www.nytimes.com/2024/08/14/us/politics/kamala-harris-economy-north-carolina.html",
          uri: "nyt://article/5a175695-f704-52a6-96fe-ea42117569b7",
          byline: "By Jim Tankersley and Andrew Duehren",
          item_type: "Article",
          updated_date: "2024-08-14T08:14:45-04:00",
          created_date: "2024-08-14T07:58:31-04:00",
          published_date: "2024-08-14T07:58:31-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: [
            "Presidential Election of 2024",
            "United States Economy",
            "United States Politics and Government",
            "Law and Legislation",
          ],
          org_facet: ["Democratic Party"],
          per_facet: ["Harris, Kamala D"],
          geo_facet: [],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14dc-harris-econ-01-gfbv/14dc-harris-econ-01-gfbv-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1365,
              width: 2048,
              type: "image",
              subtype: "photo",
              caption:
                "Some advisers to Vice President Kamala Harris believe that appearing as a relative blank slate on key issues may help her attract support from business groups put off by some of President Biden’s policies.",
              copyright: "Erin Schaff/The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14dc-harris-econ-01-gfbv/14dc-harris-econ-01-gfbv-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "Some advisers to Vice President Kamala Harris believe that appearing as a relative blank slate on key issues may help her attract support from business groups put off by some of President Biden’s policies.",
              copyright: "Erin Schaff/The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14dc-harris-econ-01-gfbv/14dc-harris-econ-01-gfbv-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "Some advisers to Vice President Kamala Harris believe that appearing as a relative blank slate on key issues may help her attract support from business groups put off by some of President Biden’s policies.",
              copyright: "Erin Schaff/The New York Times",
            },
          ],
          short_url: "",
        },
        {
          section: "style",
          subsection: "",
          title: "Gwen Walz, the Coolheaded, Ultracompetent Political Spouse",
          abstract:
            "Early in her husband’s political career, she stepped in to help. Some wondered: Why isn’t she running?",
          url: "https://www.nytimes.com/2024/08/14/style/gwen-walz-tim-walz-minnesota.html",
          uri: "nyt://article/d70ebaf3-1a67-56e8-9499-c5ba392a355d",
          byline: "By Joseph Bernstein",
          item_type: "Article",
          updated_date: "2024-08-14T05:02:39-04:00",
          created_date: "2024-08-14T05:02:39-04:00",
          published_date: "2024-08-14T05:02:39-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: [
            "Presidential Election of 2024",
            "United States Politics and Government",
            "Education (Secondary)",
            "Governors (US)",
            "Content Type: Personal Profile",
          ],
          org_facet: [],
          per_facet: ["Walz, Tim", "Smith, Tina F", "Walz, Gwen (1966- )"],
          geo_facet: ["Minnesota"],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/12/multimedia/12GWEN-WALZ-cjqf/12GWEN-WALZ-cjqf-superJumbo.jpg",
              format: "Super Jumbo",
              height: 2048,
              width: 1366,
              type: "image",
              subtype: "photo",
              caption:
                "Those who have long known Tim and Gwen Walz say that in politics they’re a package deal.",
              copyright: "Hiroko Masuike/The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/12/multimedia/12GWEN-WALZ-cjqf/12GWEN-WALZ-cjqf-threeByTwoSmallAt2X-v2.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "Those who have long known Tim and Gwen Walz say that in politics they’re a package deal.",
              copyright: "Hiroko Masuike/The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/12/multimedia/12GWEN-WALZ-cjqf/12GWEN-WALZ-cjqf-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "Those who have long known Tim and Gwen Walz say that in politics they’re a package deal.",
              copyright: "Hiroko Masuike/The New York Times",
            },
          ],
          short_url: "",
        },
        {
          section: "us",
          subsection: "",
          title:
            "Walz Faces New Scrutiny Over 2020 Riots: Was He Too Slow to Send Troops?",
          abstract:
            "Gov. Tim Walz’s response to the unrest has attracted new scrutiny, and diverging opinions, since he joined Kamala Harris’s ticket.",
          url: "https://www.nytimes.com/2024/08/14/us/tim-walz-george-floyd-riots-minneapolis.html",
          uri: "nyt://article/8543e9a7-4ef2-5242-bb98-7fcb18cf61eb",
          byline: "By Mitch Smith",
          item_type: "Article",
          updated_date: "2024-08-14T08:02:10-04:00",
          created_date: "2024-08-14T05:02:26-04:00",
          published_date: "2024-08-14T05:02:26-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: [
            "Police Brutality, Misconduct and Shootings",
            "George Floyd Protests (2020)",
          ],
          org_facet: [],
          per_facet: ["Walz, Tim"],
          geo_facet: ["Minneapolis (Minn)"],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2020/05/30/us/00nat-george-floyd-01/00nat-george-floyd-01-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1365,
              width: 2048,
              type: "image",
              subtype: "photo",
              caption:
                "Members of the Minnesota National Guard in Minneapolis in May 2020.",
              copyright: "Victor J. Blue for The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2020/05/30/us/00nat-george-floyd-01/00minn-deployment-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "Members of the Minnesota National Guard in Minneapolis in May 2020.",
              copyright: "Victor J. Blue for The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2020/05/30/us/00nat-george-floyd-01/00minn-deployment-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "Members of the Minnesota National Guard in Minneapolis in May 2020.",
              copyright: "Victor J. Blue for The New York Times",
            },
          ],
          short_url: "",
        },
        {
          section: "upshot",
          subsection: "",
          title:
            "Recent Voter Registration Data Offers Hint of Enthusiasm for Democrats",
          abstract:
            "Two swing states have seen a boost in Democratic sign-ups since Kamala Harris entered the race.",
          url: "https://www.nytimes.com/2024/08/13/upshot/democrats-voter-registration.html",
          uri: "nyt://article/8c5b1120-eb36-5822-ab62-1e1e4e1251e3",
          byline: "By Francesca Paris",
          item_type: "Article",
          updated_date: "2024-08-13T17:23:36-04:00",
          created_date: "2024-08-13T16:18:09-04:00",
          published_date: "2024-08-13T16:18:09-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: [
            "Voting Rights, Registration and Requirements",
            "Presidential Election of 2024",
            "United States Politics and Government",
          ],
          org_facet: [],
          per_facet: [
            "Harris, Kamala D",
            "Biden, Joseph R Jr",
            "Trump, Donald J",
          ],
          geo_facet: ["North Carolina", "Pennsylvania"],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/2024-08-08-dem-registration-index/2024-08-08-dem-registration-index-superJumbo-v4.png",
              format: "Super Jumbo",
              height: 1333,
              width: 2000,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright: "The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/2024-08-08-dem-registration-index/2024-08-08-dem-registration-index-threeByTwoSmallAt2X-v4.png",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright: "The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/2024-08-08-dem-registration-index/2024-08-08-dem-registration-index-thumbLarge-v4.png",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright: "The New York Times",
            },
          ],
          short_url: "",
        },
        {
          section: "technology",
          subsection: "",
          title:
            "How ‘Deepfake Elon Musk’ Became the Internet’s Biggest Scammer",
          abstract:
            "An A.I.-powered version of Mr. Musk has appeared in thousands of inauthentic ads, contributing to billions in fraud.",
          url: "https://www.nytimes.com/interactive/2024/08/14/technology/elon-musk-ai-deepfake-scam.html",
          uri: "nyt://interactive/e75e7003-9ea5-5886-a2cc-664ab108c57e",
          byline: "By Stuart A. Thompson",
          item_type: "Interactive",
          updated_date: "2024-08-14T10:19:05-04:00",
          created_date: "2024-08-14T00:00:00-04:00",
          published_date: "2024-08-14T00:00:00-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: ["Artificial Intelligence", "Frauds and Swindling"],
          org_facet: [],
          per_facet: ["Musk, Elon"],
          geo_facet: [],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/2024-06-13-disinfo-musk-scams-index/2024-06-13-disinfo-musk-scams-index-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1333,
              width: 2000,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright: "The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/2024-06-13-disinfo-musk-scams-index/2024-06-13-disinfo-musk-scams-index-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright: "The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/2024-06-13-disinfo-musk-scams-index/2024-06-13-disinfo-musk-scams-index-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright: "The New York Times",
            },
          ],
          short_url: "",
        },
        {
          section: "technology",
          subsection: "",
          title:
            "U.S. Said to Consider a Breakup of Google to Address Search Monopoly",
          abstract:
            "The Justice Department and state attorneys general are discussing various scenarios to remedy Google’s dominance in online search, including a breakup of the company.",
          url: "https://www.nytimes.com/2024/08/13/technology/google-monopoly-antitrust-justice-department.html",
          uri: "nyt://article/acf8596f-5f2c-59c0-af56-359f7d142e06",
          byline: "By David McCabe and Nico Grant",
          item_type: "Article",
          updated_date: "2024-08-13T19:45:38-04:00",
          created_date: "2024-08-13T19:45:38-04:00",
          published_date: "2024-08-13T19:45:38-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: [
            "Antitrust Laws and Competition Issues",
            "Decisions and Verdicts",
            "Computers and the Internet",
            "Search Engines",
            "Smartphones",
            "Regulation and Deregulation of Industry",
            "Chrome (Browser)",
            "Android (Operating System)",
            "Online Advertising",
          ],
          org_facet: ["Google Inc", "Justice Department", "DuckDuckGo"],
          per_facet: ["Mehta, Amit P"],
          geo_facet: [],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/13google-antitrust-kgtw/13google-antitrust-kgtw-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1365,
              width: 2048,
              type: "image",
              subtype: "photo",
              caption:
                "Google’s chief executive, Sundar Pichai, at a company event last year. The tech giant acted illegally to maintain a monopoly in online search, a federal judge ruled this month.",
              copyright: "Jason Henry for The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/13google-antitrust-kgtw/13google-antitrust-kgtw-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "Google’s chief executive, Sundar Pichai, at a company event last year. The tech giant acted illegally to maintain a monopoly in online search, a federal judge ruled this month.",
              copyright: "Jason Henry for The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/13google-antitrust-kgtw/13google-antitrust-kgtw-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "Google’s chief executive, Sundar Pichai, at a company event last year. The tech giant acted illegally to maintain a monopoly in online search, a federal judge ruled this month.",
              copyright: "Jason Henry for The New York Times",
            },
          ],
          short_url: "",
        },
        {
          section: "business",
          subsection: "dealbook",
          title:
            "Google’s Stock Falls as the Government Weighs Breaking Up the Company",
          abstract:
            "The Justice Department could force the technology group to split after a landmark court ruling that the search giant is an illegal monopoly.",
          url: "https://www.nytimes.com/2024/08/14/business/dealbook/google-stock-antitrust-break-up.html",
          uri: "nyt://article/caccee59-84eb-5da0-9fdd-8b20c8ffd8b3",
          byline:
            "By Andrew Ross Sorkin, Ravi Mattu, Bernhard Warner, Sarah Kessler, Michael J. de la Merced, Lauren Hirsch and Ephrat Livni",
          item_type: "Article",
          updated_date: "2024-08-14T10:04:09-04:00",
          created_date: "2024-08-14T08:05:25-04:00",
          published_date: "2024-08-14T08:05:25-04:00",
          material_type_facet: "",
          kicker: "DealBook Newsletter",
          des_facet: ["internal-storyline-no"],
          org_facet: [],
          per_facet: [],
          geo_facet: [],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14db-goog-kqjf/14db-goog-kqjf-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1416,
              width: 2048,
              type: "image",
              subtype: "photo",
              caption:
                "The Justice Department is considering the potentially industry-shaking move of breaking up Google.",
              copyright: "Josh Edelson/Agence France-Presse — Getty Images",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14db-goog-kqjf/14db-goog-kqjf-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "The Justice Department is considering the potentially industry-shaking move of breaking up Google.",
              copyright: "Josh Edelson/Agence France-Presse — Getty Images",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14db-goog-kqjf/14db-goog-kqjf-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "The Justice Department is considering the potentially industry-shaking move of breaking up Google.",
              copyright: "Josh Edelson/Agence France-Presse — Getty Images",
            },
          ],
          short_url: "",
        },
        {
          section: "podcasts",
          subsection: "the-daily",
          title: "How One Tech Monopoly Paved the Way for Another",
          abstract:
            "A judge’s ruling that Google abused a monopoly in internet search is likely to have major ripple effects, nearly a quarter-century after Microsoft lost a similar case.",
          url: "https://www.nytimes.com/2024/08/14/podcasts/the-daily/microsoft-google-antitrust.html",
          uri: "nyt://article/395400df-d48f-5452-ac4a-83cba1ff6888",
          byline:
            "By Sabrina Tavernise, Steve Lohr, Rikki Novetsky, Rachelle Bonja, Sydney Harper, Nina Feldman, Marc Georges, Diane Wong, Dan Powell, Pat McCusker, Elisheba Ittoop and Alyssa Moxley",
          item_type: "Article",
          updated_date: "2024-08-14T06:00:39-04:00",
          created_date: "2024-08-14T06:00:12-04:00",
          published_date: "2024-08-14T06:00:12-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: [
            "Computers and the Internet",
            "Decisions and Verdicts",
            "Antitrust Laws and Competition Issues",
            "Cyberharassment",
            "Regulation and Deregulation of Industry",
          ],
          org_facet: ["Microsoft Corp", "Google Inc"],
          per_facet: [],
          geo_facet: ["United States"],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/13DAILY-microsoft-history-wlgf/13DAILY-microsoft-history-wlgf-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1373,
              width: 2000,
              type: "image",
              subtype: "photo",
              caption:
                "Bill Gates, a founder of Microsoft, in 2001. Economists, legal scholars and business historians are still debating the impact that the Microsoft antitrust case had, or didn’t have.",
              copyright: "Richard Drew/Associated Press",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/13DAILY-microsoft-history-wlgf/13DAILY-microsoft-history-wlgf-threeByTwoSmallAt2X-v2.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "Bill Gates, a founder of Microsoft, in 2001. Economists, legal scholars and business historians are still debating the impact that the Microsoft antitrust case had, or didn’t have.",
              copyright: "Richard Drew/Associated Press",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/13DAILY-microsoft-history-wlgf/13DAILY-microsoft-history-wlgf-thumbLarge-v2.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "Bill Gates, a founder of Microsoft, in 2001. Economists, legal scholars and business historians are still debating the impact that the Microsoft antitrust case had, or didn’t have.",
              copyright: "Richard Drew/Associated Press",
            },
          ],
          short_url: "",
        },
        {
          section: "science",
          subsection: "",
          title:
            "How the World’s Oldest Humpback Whale Has Survived Is a Mystery",
          abstract:
            "Old Timer, a male first photographed in 1972, was spotted last month near Alaska, enduring in the Pacific Ocean while some other humpbacks have struggled in a changing environment.",
          url: "https://www.nytimes.com/2024/08/14/science/oldest-humpack-whale-old-timer.html",
          uri: "nyt://article/85654876-4348-547e-a0db-e83cc775bb14",
          byline: "By Emily Anthes",
          item_type: "Article",
          updated_date: "2024-08-14T09:06:09-04:00",
          created_date: "2024-08-14T05:02:33-04:00",
          published_date: "2024-08-14T05:02:33-04:00",
          material_type_facet: "",
          kicker: "Trilobites",
          des_facet: [
            "your-feed-science",
            "Whales and Whaling",
            "Research",
            "Artificial Intelligence",
            "Animal Behavior",
          ],
          org_facet: [],
          per_facet: ["Pack, Adam A."],
          geo_facet: ["Alaska"],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14tb-old-timer-gwtp/14tb-old-timer-gwtp-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1365,
              width: 2048,
              type: "image",
              subtype: "photo",
              caption:
                "The humpback whale Old Timer, observed by Adam Pack on July 29 in Frederick Sound in southeast Alaska.",
              copyright: "Adam Pack/NOAA Research Permit 26953",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14tb-old-timer-gwtp/14tb-old-timer-gwtp-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "The humpback whale Old Timer, observed by Adam Pack on July 29 in Frederick Sound in southeast Alaska.",
              copyright: "Adam Pack/NOAA Research Permit 26953",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14tb-old-timer-gwtp/14tb-old-timer-gwtp-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "The humpback whale Old Timer, observed by Adam Pack on July 29 in Frederick Sound in southeast Alaska.",
              copyright: "Adam Pack/NOAA Research Permit 26953",
            },
          ],
          short_url: "",
        },
        {
          section: "world",
          subsection: "europe",
          title:
            "Russia Moves Some Troops From Ukraine to Fight Incursion, Kyiv and U.S. Say",
          abstract:
            "Ukraine hopes that such a move will relieve pressure on frontline units. But Moscow appears reluctant to withdraw troops from eastern Ukraine, where it has been steadily advancing.",
          url: "https://www.nytimes.com/2024/08/14/world/europe/russia-ukraine-kursk-incursion-troops.html",
          uri: "nyt://article/47f724c4-fa89-5eec-897e-0690161fcc76",
          byline: "By Constant Méheut",
          item_type: "Article",
          updated_date: "2024-08-14T09:59:13-04:00",
          created_date: "2024-08-14T06:06:43-04:00",
          published_date: "2024-08-14T06:06:43-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: [
            "Defense and Military Forces",
            "Russian Invasion of Ukraine (2022)",
            "International Relations",
          ],
          org_facet: [],
          per_facet: [],
          geo_facet: ["Ukraine", "Russia"],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14ukraine-attack-wtqj/14ukraine-attack-wtqj-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1366,
              width: 2048,
              type: "image",
              subtype: "photo",
              caption:
                "A Ukrainian military vehicle passing a roadside crater minutes after a Russian strike near the border in Ukraine’s Sumy region on Tuesday.",
              copyright: "David Guttenfelder for The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14ukraine-attack-wtqj/14ukraine-attack-wtqj-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "A Ukrainian military vehicle passing a roadside crater minutes after a Russian strike near the border in Ukraine’s Sumy region on Tuesday.",
              copyright: "David Guttenfelder for The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14ukraine-attack-wtqj/14ukraine-attack-wtqj-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "A Ukrainian military vehicle passing a roadside crater minutes after a Russian strike near the border in Ukraine’s Sumy region on Tuesday.",
              copyright: "David Guttenfelder for The New York Times",
            },
          ],
          short_url: "",
        },
        {
          section: "world",
          subsection: "europe",
          title:
            "Germany Issues Arrest Warrant for Ukrainian Over Nord Stream Explosion",
          abstract:
            "The sabotage of the pipelines that carried Russian gas to Europe has become one of the central mysteries of the war in Ukraine.",
          url: "https://www.nytimes.com/2024/08/14/world/europe/nord-stream-explosion-germany-ukraine-arrest-warrant.html",
          uri: "nyt://article/0355b699-1189-531b-af5d-d08359bf969c",
          byline: "By Melissa Eddy and Julian E. Barnes",
          item_type: "Article",
          updated_date: "2024-08-14T09:36:46-04:00",
          created_date: "2024-08-14T09:30:37-04:00",
          published_date: "2024-08-14T09:30:37-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: [
            "Natural Gas",
            "Politics and Government",
            "Pipelines",
            "Sabotage (Crime)",
            "Russian Invasion of Ukraine (2022)",
          ],
          org_facet: ["Nord Stream AG"],
          per_facet: [],
          geo_facet: ["Germany", "Ukraine", "Denmark", "Sweden"],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14germany-nordstream-lwbz/14germany-nordstream-lwbz-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1366,
              width: 2048,
              type: "image",
              subtype: "photo",
              caption:
                "A photo made available by the Danish Defense Ministry of a vast swirl of bubbles on the surface of the Baltic Sea in international waters between Denmark and Sweden in September 2022. ",
              copyright:
                "Danish Defence, via Agence France-Presse - Getty Images",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14germany-nordstream-lwbz/14germany-nordstream-lwbz-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "A photo made available by the Danish Defense Ministry of a vast swirl of bubbles on the surface of the Baltic Sea in international waters between Denmark and Sweden in September 2022. ",
              copyright:
                "Danish Defence, via Agence France-Presse - Getty Images",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14germany-nordstream-lwbz/14germany-nordstream-lwbz-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "A photo made available by the Danish Defense Ministry of a vast swirl of bubbles on the surface of the Baltic Sea in international waters between Denmark and Sweden in September 2022. ",
              copyright:
                "Danish Defence, via Agence France-Presse - Getty Images",
            },
          ],
          short_url: "",
        },
        {
          section: "us",
          subsection: "politics",
          title:
            "Hunter Biden Sought State Department Help for Ukrainian Company",
          abstract:
            "After President Biden dropped his re-election bid, his administration released records showing that while he was vice president, his son solicited U.S. government assistance.",
          url: "https://www.nytimes.com/2024/08/13/us/politics/hunter-biden-ukrainian-company.html",
          uri: "nyt://article/3bf13a15-7304-58ad-a406-e094f99a1093",
          byline: "By Kenneth P. Vogel",
          item_type: "Article",
          updated_date: "2024-08-14T09:03:44-04:00",
          created_date: "2024-08-13T20:27:13-04:00",
          published_date: "2024-08-13T20:27:13-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: [
            "Foreign Agents Registration Act",
            "United States Politics and Government",
            "United States International Relations",
            "Geothermal Power",
          ],
          org_facet: [
            "Burisma Holdings Ltd",
            "Commerce Department",
            "State Department",
          ],
          per_facet: ["Biden, Hunter", "Biden, Joseph R Jr"],
          geo_facet: ["Italy"],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/13dc-biden-hunter-hbgl/13dc-biden-hunter-hbgl-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1259,
              width: 1888,
              type: "image",
              subtype: "photo",
              caption:
                "The release of records came as Hunter Biden prepares to stand trial next month on charges of evading taxes on income from Burisma and other businesses.",
              copyright: "Haiyun Jiang for The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/13dc-biden-hunter-hbgl/13dc-biden-hunter-hbgl-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "The release of records came as Hunter Biden prepares to stand trial next month on charges of evading taxes on income from Burisma and other businesses.",
              copyright: "Haiyun Jiang for The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/13dc-biden-hunter-hbgl/13dc-biden-hunter-hbgl-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "The release of records came as Hunter Biden prepares to stand trial next month on charges of evading taxes on income from Burisma and other businesses.",
              copyright: "Haiyun Jiang for The New York Times",
            },
          ],
          short_url: "",
        },
        {
          section: "opinion",
          subsection: "",
          title:
            "Kamala Harris Had a Great Health Care Idea in 2019. She Should Embrace It.",
          abstract: "A public option is both smart policy and smart politics.",
          url: "https://www.nytimes.com/2024/08/14/opinion/kamala-harris-health-care.html",
          uri: "nyt://article/20ebafe9-8a5f-503c-8395-d97391e8fa6a",
          byline: "By Jacob S. Hacker",
          item_type: "Article",
          updated_date: "2024-08-14T05:02:24-04:00",
          created_date: "2024-08-14T05:02:24-04:00",
          published_date: "2024-08-14T05:02:24-04:00",
          material_type_facet: "",
          kicker: "Guest Essay",
          des_facet: [
            "Presidential Election of 2024",
            "Health Insurance and Managed Care",
            "Medicare",
            "Patient Protection and Affordable Care Act (2010)",
            "Medicaid",
            "Presidential Election of 2020",
          ],
          org_facet: ["Democratic Party", "Republican Party"],
          per_facet: [
            "Biden, Joseph R Jr",
            "Harris, Kamala D",
            "Obama, Barack",
            "Sanders, Bernard",
            "Trump, Donald J",
          ],
          geo_facet: ["United States"],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/14/opinion/14hacker/14hacker-superJumbo-v2.jpg",
              format: "Super Jumbo",
              height: 2048,
              width: 2048,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright: "Pete Gamlen",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/opinion/14hacker/14hacker-threeByTwoSmallAt2X-v2.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright: "Pete Gamlen",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/opinion/14hacker/14hacker-thumbLarge-v2.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright: "Pete Gamlen",
            },
          ],
          short_url: "",
        },
        {
          section: "opinion",
          subsection: "",
          title:
            "Catholic Converts Like JD Vance Are Reshaping Republican Politics",
          abstract:
            "They’re also helping to build a new consensus across party lines.",
          url: "https://www.nytimes.com/2024/08/14/opinion/jd-vance-catholic-convert-republican.html",
          uri: "nyt://article/221cbeb4-ce34-592a-8fcd-09f4c0797be0",
          byline: "By Matthew Schmitz",
          item_type: "Article",
          updated_date: "2024-08-14T08:05:18-04:00",
          created_date: "2024-08-14T05:02:13-04:00",
          published_date: "2024-08-14T05:02:13-04:00",
          material_type_facet: "",
          kicker: "Guest Essay",
          des_facet: [
            "Conservatism (US Politics)",
            "United States Politics and Government",
            "Capitalism (Theory and Philosophy)",
            "Organized Labor",
          ],
          org_facet: ["Roman Catholic Church", "Republican Party"],
          per_facet: ["Vance, J D"],
          geo_facet: [],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/14/opinion/14schmitz/14schmitz-superJumbo.jpg",
              format: "Super Jumbo",
              height: 2000,
              width: 2000,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright:
                "Photo illustration by The New York Times; source photograph by Emily Elconin/Getty Images",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/opinion/14schmitz/14schmitz-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright:
                "Photo illustration by The New York Times; source photograph by Emily Elconin/Getty Images",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/opinion/14schmitz/14schmitz-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright:
                "Photo illustration by The New York Times; source photograph by Emily Elconin/Getty Images",
            },
          ],
          short_url: "",
        },
        {
          section: "opinion",
          subsection: "",
          title: "The Sweaty, Dangerous Labor of Making the Subways Safer",
          abstract:
            "New York is trying to improve both its mental health system and its criminal justice process. Other cities are watching carefully.",
          url: "https://www.nytimes.com/2024/08/14/opinion/nyc-subway-safety-criminal-justice.html",
          uri: "nyt://article/ed65420d-6cb5-5e6b-a9d5-814d72700e71",
          byline: "By Nicole Gelinas",
          item_type: "Article",
          updated_date: "2024-08-14T08:08:49-04:00",
          created_date: "2024-08-14T05:00:28-04:00",
          published_date: "2024-08-14T05:00:28-04:00",
          material_type_facet: "",
          kicker: "Guest Essay",
          des_facet: [
            "Mental Health and Disorders",
            "Criminal Justice",
            "Police",
            "Subways",
            "Homeless Persons",
            "Crime and Criminals",
          ],
          org_facet: [
            "Metropolitan Transportation Authority",
            "Police Department (NYC)",
          ],
          per_facet: [],
          geo_facet: ["New York City"],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14gelinas-mqkc/14gelinas-mqkc-superJumbo.jpg",
              format: "Super Jumbo",
              height: 2048,
              width: 1366,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright: "Gus Aronson for The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14gelinas-mqkc/14gelinas-mqkc-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright: "Gus Aronson for The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14gelinas-mqkc/14gelinas-mqkc-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright: "Gus Aronson for The New York Times",
            },
          ],
          short_url: "",
        },
        {
          section: "opinion",
          subsection: "",
          title: "Why Democrats Should Sing the Union’s Civil War Anthems",
          abstract: "They evoke an uplifting patriotism from an earlier era.",
          url: "https://www.nytimes.com/live/2024/08/13/opinion/thepoint/democrats-civil-war-anthems",
          uri: "nyt://article/17c4c122-3212-5aca-9001-c1549ef6e0c6",
          byline: "By Parker Richards",
          item_type: "Article",
          updated_date: "2024-08-14T05:03:45-04:00",
          created_date: "2024-08-14T05:03:45-04:00",
          published_date: "2024-08-14T05:03:45-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: [],
          org_facet: [],
          per_facet: [],
          geo_facet: [],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/13opinion-thepoint-richards-songs-qhzv/13opinion-thepoint-richards-songs-qhzv-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1638,
              width: 2048,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright: "Daniel Ribar for The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/13opinion-thepoint-richards-songs-qhzv/13opinion-thepoint-richards-songs-qhzv-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright: "Daniel Ribar for The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/13/multimedia/13opinion-thepoint-richards-songs-qhzv/13opinion-thepoint-richards-songs-qhzv-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption: "",
              copyright: "Daniel Ribar for The New York Times",
            },
          ],
          short_url: "",
        },
        {
          section: "briefing",
          subsection: "",
          title: "The Global Race to Control A.I.",
          abstract: "We explore who is winning — and what could come next.",
          url: "https://www.nytimes.com/2024/08/14/briefing/ai-china-us-technology.html",
          uri: "nyt://article/85018576-13d2-59e3-a528-009d61e9a6c4",
          byline: "By Adam Satariano and Paul Mozur",
          item_type: "Article",
          updated_date: "2024-08-14T06:19:50-04:00",
          created_date: "2024-08-14T06:19:50-04:00",
          published_date: "2024-08-14T06:19:50-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: [
            "internal-storyline-no",
            "Artificial Intelligence",
            "Science and Technology",
          ],
          org_facet: [],
          per_facet: [],
          geo_facet: ["China"],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14themorning-nl-LEDE-AI-02-fzqk/14themorning-nl-LEDE-AI-02-fzqk-superJumbo.jpg",
              format: "Super Jumbo",
              height: 2048,
              width: 1638,
              type: "image",
              subtype: "photo",
              caption: "At a chip factory in Dresden, Germany.",
              copyright: "Sean Gallup/Getty Images",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14themorning-nl-LEDE-AI-02-fzqk/14themorning-nl-LEDE-AI-02-fzqk-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption: "At a chip factory in Dresden, Germany.",
              copyright: "Sean Gallup/Getty Images",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14themorning-nl-LEDE-AI-02-fzqk/14themorning-nl-LEDE-AI-02-fzqk-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption: "At a chip factory in Dresden, Germany.",
              copyright: "Sean Gallup/Getty Images",
            },
          ],
          short_url: "",
        },
        {
          section: "arts",
          subsection: "television",
          title: "Late Night Recaps Musk’s and Trump’s Two-Hour Chat on X",
          abstract:
            "Stephen Colbert called it “a big night for weird old rich guys with no friends.”",
          url: "https://www.nytimes.com/2024/08/14/arts/television/late-night-trump-musk.html",
          uri: "nyt://article/0cb192ef-7d54-5efd-838f-02ae10ef6538",
          byline: "By Trish Bendix",
          item_type: "Article",
          updated_date: "2024-08-14T01:58:28-04:00",
          created_date: "2024-08-14T01:51:54-04:00",
          published_date: "2024-08-14T01:51:54-04:00",
          material_type_facet: "",
          kicker: "Best of Late Night",
          des_facet: [
            "Television",
            "Late Show with Stephen Colbert (TV Program)",
            "Late Night with Seth Meyers (TV Program)",
            "The Tonight Show (TV Program)",
            "The Daily Show with Trevor Noah (TV Program)",
            "Jimmy Kimmel Live (TV Program)",
          ],
          org_facet: [],
          per_facet: ["Colbert, Stephen", "Meyers, Seth", "Fallon, Jimmy"],
          geo_facet: [],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/14/arts/14latenight/14latenight-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1014,
              width: 1815,
              type: "image",
              subtype: "photo",
              caption:
                "Stephen Colbert said that Donald Trump’s return to X on Monday “just reminds people of the awful reason he was banned to begin with.”",
              copyright: "CBS",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/arts/14latenight/14latenight-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "Stephen Colbert said that Donald Trump’s return to X on Monday “just reminds people of the awful reason he was banned to begin with.”",
              copyright: "CBS",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/arts/14latenight/14latenight-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "Stephen Colbert said that Donald Trump’s return to X on Monday “just reminds people of the awful reason he was banned to begin with.”",
              copyright: "CBS",
            },
          ],
          short_url: "",
        },
        {
          section: "nyregion",
          subsection: "",
          title:
            "Judge Denies Trump’s Recusal Bid, Rebuking Him for Claiming Harris Ties",
          abstract:
            "Justice Juan M. Merchan, who oversaw the trial that led to Donald J. Trump’s conviction, declined for a third time to step aside from the case, dismissing claims from defense lawyers that he had a conflict of interest.",
          url: "https://www.nytimes.com/2024/08/14/nyregion/trump-trial-merchan-recusal.html",
          uri: "nyt://article/3e7f4935-18e8-5a8c-b1c0-1aced20e6901",
          byline: "By Kate Christobek and Ben Protess",
          item_type: "Article",
          updated_date: "2024-08-14T09:44:26-04:00",
          created_date: "2024-08-14T08:27:00-04:00",
          published_date: "2024-08-14T08:27:00-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: ["New York State Criminal Case Against Trump (71543-23)"],
          org_facet: [],
          per_facet: ["Merchan, Juan M", "Trump, Donald J"],
          geo_facet: [],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/12/multimedia/00-Merchan-Recusal-01-czhf/00-Merchan-Recusal-01-czhf-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1365,
              width: 2048,
              type: "image",
              subtype: "photo",
              caption:
                "Donald J. Trump has lashed out at the judge’s family and stoked right-wing furor against his daughter. The judge dismissed his request as “nothing more than a repetition of stale and unsubstantiated claims.”",
              copyright: "Jefferson Siegel for The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/12/multimedia/00-Merchan-Recusal-01-czhf/00-Merchan-Recusal-01-czhf-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "Donald J. Trump has lashed out at the judge’s family and stoked right-wing furor against his daughter. The judge dismissed his request as “nothing more than a repetition of stale and unsubstantiated claims.”",
              copyright: "Jefferson Siegel for The New York Times",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/12/multimedia/00-Merchan-Recusal-01-czhf/00-Merchan-Recusal-01-czhf-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "Donald J. Trump has lashed out at the judge’s family and stoked right-wing furor against his daughter. The judge dismissed his request as “nothing more than a repetition of stale and unsubstantiated claims.”",
              copyright: "Jefferson Siegel for The New York Times",
            },
          ],
          short_url: "",
        },
        {
          section: "business",
          subsection: "dealbook",
          title:
            "Makers of Snickers and Pringles to Merge in $36 Billion Food Deal",
          abstract:
            "Mars is acquiring Kellanova in one of the largest deals in the industry in years, creating a new global giant with a stable of well-known brands.",
          url: "https://www.nytimes.com/2024/08/14/business/dealbook/mars-kellanova-deal-pringles-cheezit.html",
          uri: "nyt://article/41ee769c-1009-5cce-856d-196d350bedc9",
          byline: "By Lauren Hirsch",
          item_type: "Article",
          updated_date: "2024-08-14T09:08:38-04:00",
          created_date: "2024-08-14T07:16:44-04:00",
          published_date: "2024-08-14T07:16:44-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: [
            "Mergers, Acquisitions and Divestitures",
            "Snack Foods",
            "Candy",
          ],
          org_facet: ["Mars Inc", "Kellanova"],
          per_facet: [],
          geo_facet: ["North America"],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/mars-deal-jhpk/mars-deal-jhpk-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1221,
              width: 2048,
              type: "image",
              subtype: "photo",
              caption:
                "Mars, which is privately owned, has tried to broaden beyond sweets. ",
              copyright: "Fabrizio Bensch/Reuters",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/mars-deal-jhpk/mars-deal-jhpk-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "Mars, which is privately owned, has tried to broaden beyond sweets. ",
              copyright: "Fabrizio Bensch/Reuters",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/mars-deal-jhpk/mars-deal-jhpk-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "Mars, which is privately owned, has tried to broaden beyond sweets. ",
              copyright: "Fabrizio Bensch/Reuters",
            },
          ],
          short_url: "",
        },
        {
          section: "world",
          subsection: "asia",
          title: "Japan’s Leader, Fumio Kishida, Will Step Down",
          abstract:
            "The unpopular prime minister is bowing to pressure within his party. But it is unclear whether the party is truly ready to choose a candidate who will meet the public’s concerns.",
          url: "https://www.nytimes.com/2024/08/13/world/asia/fumio-kishida-japan-prime-minister.html",
          uri: "nyt://article/61c5b626-5e20-57d4-8c30-db859b3d9e39",
          byline: "By River Akira Davis, Hisako Ueno and Kiuko Notoya",
          item_type: "Article",
          updated_date: "2024-08-14T05:28:01-04:00",
          created_date: "2024-08-13T22:12:33-04:00",
          published_date: "2024-08-13T22:12:33-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: [
            "Politics and Government",
            "Appointments and Executive Changes",
          ],
          org_facet: [],
          per_facet: ["Kishida, Fumio"],
          geo_facet: ["Japan"],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14japan-kishida-01-lkcj/14japan-kishida-01-lkcj-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1365,
              width: 2048,
              type: "image",
              subtype: "photo",
              caption:
                "Prime Minister Fumio Kishida of Japan after a news conference in Tokyo on Wednesday. Mr. Kishida has been Japan’s prime minister since 2021.",
              copyright: "Pool photo by Philip Fong",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14japan-kishida-01-lkcj/14japan-kishida-01-lkcj-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "Prime Minister Fumio Kishida of Japan after a news conference in Tokyo on Wednesday. Mr. Kishida has been Japan’s prime minister since 2021.",
              copyright: "Pool photo by Philip Fong",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14japan-kishida-01-lkcj/14japan-kishida-01-lkcj-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "Prime Minister Fumio Kishida of Japan after a news conference in Tokyo on Wednesday. Mr. Kishida has been Japan’s prime minister since 2021.",
              copyright: "Pool photo by Philip Fong",
            },
          ],
          short_url: "",
        },
        {
          section: "world",
          subsection: "asia",
          title:
            "Thai Court Ejects Prime Minister, as Old Guard Reasserts Power",
          abstract:
            "Prime Minister Srettha Thavisin was considered a figurehead leader in a behind-the-scenes power struggle. He was ousted on ethics charges.",
          url: "https://www.nytimes.com/2024/08/14/world/asia/thailand-prime-minister-srettha.html",
          uri: "nyt://article/fbbd9d35-a0d0-5494-b140-26137122bdbd",
          byline: "By Sui-Lee Wee",
          item_type: "Article",
          updated_date: "2024-08-14T09:49:00-04:00",
          created_date: "2024-08-14T05:22:11-04:00",
          published_date: "2024-08-14T05:22:11-04:00",
          material_type_facet: "",
          kicker: "",
          des_facet: [
            "Politics and Government",
            "Elections",
            "internal-storyline-no",
          ],
          org_facet: ["Move Forward Party (Thailand)"],
          per_facet: ["Srettha Thavisin", "Thaksin Shinawatra"],
          geo_facet: ["Thailand"],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14thailand-politics-qgwf/14thailand-politics-qgwf-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1365,
              width: 2048,
              type: "image",
              subtype: "photo",
              caption:
                "Prime Minister Srettha Thavisin of Thailand at a news conference in Bangkok on Wednesday.",
              copyright: "Sakchai Lalit/Associated Press",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14thailand-politics-qgwf/14thailand-politics-qgwf-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "Prime Minister Srettha Thavisin of Thailand at a news conference in Bangkok on Wednesday.",
              copyright: "Sakchai Lalit/Associated Press",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/14/multimedia/14thailand-politics-qgwf/14thailand-politics-qgwf-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "Prime Minister Srettha Thavisin of Thailand at a news conference in Bangkok on Wednesday.",
              copyright: "Sakchai Lalit/Associated Press",
            },
          ],
          short_url: "",
        },
        {
          section: "style",
          subsection: "",
          title: "What People Wear in One of the Happiest Places on Earth",
          abstract:
            "At Copenhagen Fashion Week, outfits on and off the runway had a lively spirit that reflected the event’s location in a country known for its quality of life.",
          url: "https://www.nytimes.com/2024/08/14/style/copenhagen-fashion-week-outfit-trends.html",
          uri: "nyt://article/9b271553-ec22-5b69-873e-6c267c64d1d9",
          byline: "By Simbarashe Cha",
          item_type: "Article",
          updated_date: "2024-08-14T09:13:29-04:00",
          created_date: "2024-08-14T05:03:25-04:00",
          published_date: "2024-08-14T05:03:25-04:00",
          material_type_facet: "",
          kicker: "Style Outside",
          des_facet: ["vis-photo", "Fashion and Apparel", "Fashion Shows"],
          org_facet: [],
          per_facet: [],
          geo_facet: ["Copenhagen (Denmark)"],
          multimedia: [
            {
              url: "https://static01.nyt.com/images/2024/08/15/multimedia/14STYLEOUTSIDE-COPENHAGEN-01-fgmh/14STYLEOUTSIDE-COPENHAGEN-01-fgmh-superJumbo.jpg",
              format: "Super Jumbo",
              height: 1366,
              width: 2048,
              type: "image",
              subtype: "photo",
              caption:
                "An out-of-this-world ensemble that looked cooler with the hand-held electronic fan.",
              copyright: "",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/15/multimedia/14STYLEOUTSIDE-COPENHAGEN-01-fgmh/14STYLEOUTSIDE-COPENHAGEN-01-fgmh-threeByTwoSmallAt2X.jpg",
              format: "threeByTwoSmallAt2X",
              height: 400,
              width: 600,
              type: "image",
              subtype: "photo",
              caption:
                "An out-of-this-world ensemble that looked cooler with the hand-held electronic fan.",
              copyright: "",
            },
            {
              url: "https://static01.nyt.com/images/2024/08/15/multimedia/14STYLEOUTSIDE-COPENHAGEN-01-fgmh/14STYLEOUTSIDE-COPENHAGEN-01-fgmh-thumbLarge.jpg",
              format: "Large Thumbnail",
              height: 150,
              width: 150,
              type: "image",
              subtype: "photo",
              caption:
                "An out-of-this-world ensemble that looked cooler with the hand-held electronic fan.",
              copyright: "",
            },
          ],
          short_url: "",
        },
      ],
    },
  },
];
