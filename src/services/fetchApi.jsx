import axios from "axios";

axios.defaults.baseURL = "";
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
