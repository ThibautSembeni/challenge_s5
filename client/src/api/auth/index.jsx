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

export const getAllUsers = async ({
      page = 1,
      itemsPerPage = 30,
      pagination = false,
      ...filters
    } = {}) => {
  const params = new URLSearchParams({
    page,
    itemsPerPage,
    pagination,
    ...filters,
  });
  return axios.get(
    `${import.meta.env.VITE_API_URL}/users?${params.toString()}`,
  );
};

export const updateOneUsers = async ( uuid, { firstname, lastname, email, phone, address, city, postalCode, newPassword, oldPassword }) => {
  try {
    const response = await axiosInstance.patch(`/users/${uuid}`, {
      firstname, lastname, email, phone, address, city, postalCode, newPassword, oldPassword
    }, {
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
    return { success: false, message: "Une erreur est survenue lors de la mise à jour de l'utilisateur" };
  }
};

export const deleteUser = async (uuid) => {
  try {
    await axiosInstance.delete(`/users/${uuid}`);

    return { success: true };
  } catch (error) {
    return { success: false, message: "Une erreur est survenue lors de la suppression du cabinet" };
  }
};