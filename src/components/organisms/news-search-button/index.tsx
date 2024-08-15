import { FC } from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

type NewsSearchButtonProps = {
  onClick: () => void;
};

const NewsSearchButton: FC<NewsSearchButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      color="success"
      fullWidth
      startIcon={<SearchIcon />}
      onClick={onClick}
    >
      Search
    </Button>
  );
};

export default NewsSearchButton;
