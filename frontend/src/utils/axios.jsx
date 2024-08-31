import axios from "axios";

const userAxios = axios.create({
  baseURL: "payments-app-backend-alpha.vercel.app/api/v1/user/",
});

export default userAxios;
