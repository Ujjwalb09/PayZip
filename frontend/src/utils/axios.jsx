import axios from "axios";

const userAxios = axios.create({
  baseURL: "https://pay-zip-backend.vercel.app/api/v1/user",
  // baseURL: "http://localhost:8080/api/v1/user",
});

export const otpAxios = axios.create({
  baseURL: "https://pay-zip-backend.vercel.app/api/v1/otp",
  // baseURL: "http://localhost:8080/api/v1/otp",
});

export const accountAxios = axios.create({
  baseURL: "https://pay-zip-backend.vercel.app/api/v1/account",
  // baseURL: "http://localhost:8080/api/v1/account",
});

export default userAxios;
