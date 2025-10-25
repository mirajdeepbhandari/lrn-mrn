export const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = "/api";

export const URLS = {
  LOGIN: API_URL + "/users/login",
  REGISTER: API_URL + "/users/register",
  VERIFY_EMAIL: API_URL + "/users/verify-email",
  FORGET_PASSWORD: API_URL + "/users/forget-password",
  RESEND_EMAIL: API_URL + "/users/resend-token",
  VERIFY_EMAIL_PASSWORD: API_URL + "/users/generate-reset-token",
  RESET_PASSWORD: API_URL + "/users/verify-password",
  GET_PUBLISHED_BLOGS: API_URL + "/blogs/published-blogs",
  POST_CREATE_BLOG: API_URL + "/blogs/create",
  GET_SINGLE_BLOG: API_URL + "/blogs/:slug",
};