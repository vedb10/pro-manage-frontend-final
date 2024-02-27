import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;


export const getAllCards = async (email) => {
    try {
      const reqUrl = `${backendUrl}/getallcards?email=${email}`;
  
      const response = await axios.get(reqUrl);
  
  
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };