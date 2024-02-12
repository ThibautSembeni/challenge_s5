import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

export const postLogin = async ({ email, password }) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/login`, {
    email: email,
    password: password,
  });
};
export const postRegister = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/users`, {
    firstname: firstname,
    lastname: lastname,
    email: email,
    plainPassword: password,
  });
};
export const getLogout = async () => {
  return axiosInstance.post(
    `/logout?refresh_token=${localStorage.getItem("refresh_token")}`,
  );
};

export const getAuthenticated = async (token) => {
  return axiosInstance.get(`/users/current/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const refreshToken = async () => {
  return axiosInstance.post("/token/refresh", {
    refresh_token: localStorage.getItem("refresh_token"),
  });
};

export const getUser = async (uuid) => {
  return axiosInstance.get(`/users/${uuid}`);
};
export const updateOneUsers = async (
  uuid,
  {
    firstname,
    lastname,
    email,
    phone,
    address,
    city,
    postalCode,
    newPassword,
    oldPassword,
  },
) => {
  return axiosInstance.patch(`/users/${uuid}`, {
    firstname,
    lastname,
    email,
    phone,
    address,
    city,
    postalCode,
    newPassword,
    oldPassword,
  });
};

export const deleteUser = async (uuid) => {
  return axiosInstance.delete(`/users/${uuid}`);
};
