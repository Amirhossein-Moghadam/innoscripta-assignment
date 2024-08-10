import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { News } from "common/types/news.type";

type NewsCardProps = {
  news: News;
};

const NewsCard: FC<NewsCardProps> = ({ news }) => {
  const {
    title,
    url,
    author,
    category,
    content,
    imageUrl,
    publishedAt,
    publisher,
  } = news;

  return (
    <Box
      sx={{
        border: "1px solid rgb(235, 235, 235)",
        borderRadius: "12px",
        display: "flex",
        height: "200px",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box className="h-full">
        <Typography>{title}</Typography>

        <Typography variant="caption">{content}</Typography>
      </Box>

      <Box className="w-[232px] min-w-[232px] max-w-[232px] h-full">
        {imageUrl && (
          <img
            className="w-full h-full"
            style={{ objectFit: "cover" }}
            src={imageUrl}
            alt="img-news"
          />
        )}
      </Box>
    </Box>
  );
};

export default NewsCard;

// "Segoe UI","Segoe UI Web Regular","Segoe UI Symbol","Helvetica Neue","BBAlpha Sans","S60 Sans",Arial,sans-serif
