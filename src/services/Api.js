import axios from "axios";

export default axios.create({
  baseURL: "http://www.stupidbird.xyz:8888/api",
  headers: {
    "Content-type": "application/json"
  }
});
