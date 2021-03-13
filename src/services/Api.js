import axios from "axios";

const base = "http://192.168.1.106:8889";

const jav = axios.create({
  baseURL: base + "/api",
  headers: {
    "Content-type": "application/json"
  }
});

const user = axios.create({
  baseURL: base + "/api/user",
  headers: {
    "Content-type": "application/json"
  }
});

user.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

const suggest = axios.create({
  baseURL: "http://192.168.1.106:9200/suggest-*/_search"
});

export { jav, suggest, user };
