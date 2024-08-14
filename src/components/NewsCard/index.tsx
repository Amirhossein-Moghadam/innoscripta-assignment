import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import { News } from "common/types/news.type";
import dateTimeConverter from "utils/times/date-time-converter";
import { Grid } from "@mui/material";

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

  const onNewsCardClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    // <Card
    //   className="!shadow p-0 h-full min-h-[200px]"
    //   onClick={onNewsCardClick}
    // >
    //   <CardActionArea className="h-full">
    //     <CardContent
    //       sx={{
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "space-between",
    //         padding: "12px",
    //         height: "100%",
    //       }}
    //     >
    //       <Box className="h-full flex flex-col">
    //         <Box className="flex items-center mb-1">
    //           <Box className="w-[8px] h-[8px] bg-success rounded-full" />
    //           <Typography
    //             variant="body1"
    //             sx={{ fontWeight: 500, fontSize: 12, ml: 0.5 }}
    //           >
    //             {publisher}
    //           </Typography>

    //           <Typography
    //             variant="body1"
    //             sx={{ fontWeight: 400, fontSize: 12, ml: 1 }}
    //           >
    //             {dateTimeConverter(publishedAt)}
    //           </Typography>
    //         </Box>

    //         <Box>
    //           <Typography
    //             variant="body1"
    //             sx={{ fontWeight: 600, fontSize: 18 }}
    //           >
    //             {title}
    //           </Typography>
    //           <Typography
    //             variant="body1"
    //             sx={{
    //               marginTop: 1,
    //               fontSize: 13,
    //               overflow: "hidden",
    //               display: "-webkit-box",
    //               WebkitLineClamp: 2,
    //               WebkitBoxOrient: "vertical",
    //               textOverflow: "ellipsis",
    //             }}
    //           >
    //             {content}
    //           </Typography>
    //         </Box>

    //         <Box className="flex items-center justify-between mt-2 flex-1">
    //           <Typography
    //             variant="body1"
    //             sx={{ fontWeight: 500, fontSize: 12 }}
    //           >
    //             {author}
    //           </Typography>

    //           {category && (
    //             <Typography
    //               variant="body1"
    //               sx={{
    //                 fontWeight: 600,
    //                 fontSize: 11,
    //                 border: "1px solid black",
    //                 borderRadius: 4,
    //                 padding: [0.5, 0.25],
    //               }}
    //             >
    //               {category.charAt(0).toLocaleUpperCase() + category.slice(1)}
    //             </Typography>
    //           )}
    //         </Box>
    //       </Box>

    //       <Box className="w-[232px] min-w-[232px] max-w-[232px] h-full ml-5">
    //         {imageUrl && (
    //           <img
    //             className="w-full h-full rounded-[12px]"
    //             style={{ objectFit: "fill" }}
    //             src={imageUrl}
    //             alt="img-news"
    //           />
    //         )}
    //       </Box>
    //     </CardContent>
    //   </CardActionArea>
    // </Card>

    <Card
      className="!shadow p-0 h-full min-h-[200px]"
      onClick={onNewsCardClick}
    >
      <CardActionArea className="h-full">
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // padding: "12px",
            height: "100%",
          }}
        >
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Box className="flex items-center mb-1">
                <Box className="w-[8px] h-[8px] bg-success rounded-full" />
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, fontSize: 12, ml: 0.5 }}
                >
                  {publisher}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ fontWeight: 400, fontSize: 12, ml: 1 }}
                >
                  {dateTimeConverter(publishedAt)}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, fontSize: 18 }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: 1,
                    fontSize: 13,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                  }}
                >
                  {content}
                </Typography>
              </Box>

              <Box className="flex items-center justify-between mt-2 flex-1">
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, fontSize: 12 }}
                >
                  {author}
                </Typography>

                {category && (
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      border: "1px solid black",
                      borderRadius: 4,
                      padding: [0.5, 0.25],
                    }}
                  >
                    {category.charAt(0).toLocaleUpperCase() + category.slice(1)}
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid item sm={12} md={6}>
              <Box
               className="min-w-full"
              //  className="max-w-[232px]"
               >
                {imageUrl && (
                  <img
                    className="w-full h-full rounded-[12px]"
                    style={{ objectFit: "fill" }}
                    src={imageUrl}
                    alt="img-news"
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NewsCard;
