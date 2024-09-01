import axios from "axios";

const userAxios = axios.create({
  baseURL: "http://localhost:8080/api/v1/user/",
});

export const otpAxios = axios.create({
  baseURL: "http://localhost:8080/api/v1/otp/",
});

export const accountAxios = axios.create({
  baseURL: "http://localhost:8080/api/v1/account/",
});

export default userAxios;
