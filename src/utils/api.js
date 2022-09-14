import axios from "axios";
const REACT_APP_API = process.env.REACT_APP_API;
export default axios.create({
  baseURL: `${REACT_APP_API}`,
});
