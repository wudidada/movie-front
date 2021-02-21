import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8889/api",
  headers: {
    "Content-type": "application/json"
  }
});
