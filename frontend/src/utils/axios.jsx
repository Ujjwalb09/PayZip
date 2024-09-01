import axios from "axios";

const userAxios = axios.create({
  baseURL: "https://payments-app-backend-9jp1.onrender.com/api/v1/user/",
});

export const otpAxios = axios.create({
  baseURL: "https://payments-app-backend-9jp1.onrender.com/api/v1/otp/",
});

export const accountAxios = axios.create({
  baseURL: "https://payments-app-backend-9jp1.onrender.com/api/v1/account/",
});

export default userAxios;
