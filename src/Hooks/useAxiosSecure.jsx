import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthContext";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    //interceptor request
    axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      console.log('token', user?.accessToken)

      return config;
    });

  }, [user]);
  return axiosSecure;
};

export default useAxiosSecure;
