import axios from "axios";

const jav = axios.create({
  baseURL: "http://192.168.1.106:8888/api",
  headers: {
    "Content-type": "application/json"
  }
});

const suggest = axios.create({
  baseURL: "http://192.168.1.106:9200/suggest-*/_search"
});

export { jav, suggest };
