import axios from "axios";

const userAxios = axios.create({
  baseURL: "http://localhost:8080/api/v1/user/",
});

export default userAxios;
