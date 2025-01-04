import axios from "axios";

const apiUrl = process.env.REACT_APP_BASE_URL_API;

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
    return response.data;
  } catch (error) {
    console.error("Data faild:", error);
    throw error();
  }
};

export default fetchAPI;
