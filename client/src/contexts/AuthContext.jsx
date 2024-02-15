import React, {createContext, useCallback, useContext, useEffect, useState,} from "react";
import {getAuthenticated, getLogout, postLogin, postRegister, refreshToken,} from "@/api/auth";
import {useNavigate} from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance.js";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [access_token, setAccessToken] = useState(null);
  const [refresh_token, setRefreshToken] = useState(null);
  const navigate = useNavigate();

  const isAccessTokenExpired = useCallback((access_token) => {
    console.log(access_token);
    if (!access_token) {
      return true;
    }
    const { exp } = jwtDecode(access_token);
    if (!exp) {
      return true;
    }
    console.log("le token expire à", exp);
    const currentTime = Math.round(Date.now() / 1000);
    return currentTime > exp;
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    const res = await postLogin({ email, password })
      .then(async (res) => {
        if (res.status === 200) {
          setError(null);
          setIsAuthenticated(true);
          setAccessToken(res.data.token);
          setRefreshToken(res.data.refresh_token);
          localStorage.setItem("access_token", res.data.token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          await checkUser(res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.request.status === 401) {
          setError({ message: "Invalid credentials" });
        }
      })
      .finally(() => setIsLoading(false));
  };
  const register = async (firstname, lastname, email, password) => {
    setIsLoading(true);
    const res = await postRegister({ firstname, lastname, email, password })
      .then((res) => {
        if (res.status === 201) {
          setError(null);
          navigate("/connexion");
        }
      })
      .catch((err) => {
        if (err.request.status === 422) {
          setError({ message: "Something went wrong" });
        } else {
          setError({ message: "Something went wrong" });
        }
      })
      .finally(() => setIsLoading(false));
  };

  const logout = async () => {
    setIsLoading(true);
    await getLogout()
      .then(() => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("selectedClinic");
        setAccessToken(null);
        setRefreshToken(null);
      })
      .finally(() => setIsLoading(false));
  };

  const signInSilent = async () => {
    await refreshToken()
      .then((res) => {
        setAccessToken(res.data.token);
        setRefreshToken(res.data.refresh_token);
        localStorage.setItem("access_token", res.data.token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        checkUser();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const checkUser = async (token = localStorage.getItem("access_token")) => {
    setIsLoading(true);
    await getAuthenticated(token)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          setIsAuthenticated(true);
        }
      })
      .catch((err) => {
        if (err.request.status === 401) {
          setUser(null);
          setIsAuthenticated(false);
        }
      });
    setIsLoading(false);
  };

  useEffect(() => {
    if (!access_token) {
      setAccessToken(localStorage.getItem("access_token"));
      setRefreshToken(localStorage.getItem("refresh_token"));
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      axiosInstance.defaults.headers[
        "Authorization"
      ] = `Bearer ${access_token}`;
    } else {
      checkUser();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const renewToken = (access_token) => {
      if (!isLoading && isAccessTokenExpired(access_token)) {
        console.log("renewToken", "le token est expiré");
        signInSilent();
      }
    };

    const intervalId = setInterval(() => renewToken(access_token), 3600000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isLoading,
        error,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
