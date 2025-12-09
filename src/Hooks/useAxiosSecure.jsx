import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    // Response Interceptor
    const interceptor = axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        const status = error.response ? error.response.status : null;
        if (status === 401 || status === 403) {
          await signOutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
