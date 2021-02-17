import axios from "axios";
// Remember to change the baseURL, it depends on REST APIs url that your Server configures.
export default axios.create({
  baseURL: "http://localhost:8082",
  headers: {
    "Content-type": "application/json"
  }
});