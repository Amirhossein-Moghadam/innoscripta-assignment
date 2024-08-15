import { FC } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const NewsKeywordTextfield: FC<TextFieldProps> = (props) => {
  return <TextField label="Keyword" fullWidth {...props} />;
};

export default NewsKeywordTextfield;
