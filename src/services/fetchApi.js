import axios from "axios";

const apiUrl = process.env.REACT_APP_BASE_URL_API || "http://localhost:3002";
// const apiUrl ="http://localhost:3001";
axios.defaults.baseURL = apiUrl;
axios.defaults.headers = {
  "Content-Type": "application/json",
};

const fetchAPI = async (url, method = "GET", data = null, headers = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response;
  } catch (error) {
    console.error("Data failed:", error.response?.data || error.message);
    throw error;
  }
};

export default fetchAPI;
