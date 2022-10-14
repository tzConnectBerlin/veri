import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const refreshUrl: any = process.env.refresh_ENDPOINT;

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<any> => {
  if (error.response) {
    // Access Token was expired
    if (
      error.response.status === 401 &&
      error.response.data === "token expired"
    ) {
      try {
        // Silently refresh tokenData
        const rs = await axios.post(refreshUrl);
        const { token, user } = rs.data;
        return Promise.resolve("resolved");
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
  }
  return Promise.reject(error);
};

export const setupInterceptorsTo = (
  axiosInstance: AxiosInstance
): AxiosInstance => {
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};
