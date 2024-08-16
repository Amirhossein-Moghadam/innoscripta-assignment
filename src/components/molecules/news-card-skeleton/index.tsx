import { Grid } from "@mui/material";
import InnoscriptaSkeleton from "components/atoms/skeleton";

const NewsCardSkeleton = () => {
  return (
    <Grid container className="w-[100%] h-[200px] p-0 shadow rounded">
      <Grid item xs={12} className="w-full h-full">
        <InnoscriptaSkeleton width={"100%"} height={"100%"} />
      </Grid>
    </Grid>
  );
};

export default NewsCardSkeleton;
