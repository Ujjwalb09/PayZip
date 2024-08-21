import axios from "axios";

export const userAxios = axios.create({
  baseURL: "http://localhost:8080/api/v1/user/",
});
