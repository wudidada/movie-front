import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.106:8888/api",
  headers: {
    "Content-type": "application/json"
  }
});
