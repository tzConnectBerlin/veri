import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const refreshAuthLogic = () => {
  return axios.post("refresh URL");
};

createAuthRefreshInterceptor(axios, refreshAuthLogic);
