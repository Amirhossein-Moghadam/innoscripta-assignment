import { FC } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const NewsAuthorTextfield: FC<TextFieldProps> = (props) => {
  return <TextField label="Author" fullWidth {...props} />;
};

export default NewsAuthorTextfield;
