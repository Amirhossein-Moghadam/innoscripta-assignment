import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type Args = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: { [key in string | number]: string | number | undefined };
};

const services = async (args: Args) => {
  const { url, params, method = "GET" } = args;
  const config: AxiosRequestConfig = {
    method,
    url,
    params,
  };

  const response = await axios(config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("Axios Request Error:", error);
      return [];
    });

  return response;
};

export default services;
