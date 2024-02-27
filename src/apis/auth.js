import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async ({ name, email, password, confirmPassword }) => {
    try {
        const reqUrl = `${backendUrl}/register`;
        const reqPayload = { name, email, password, confirmPassword  };
        const response = await axios.post(reqUrl, reqPayload);
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const reqUrl = `${backendUrl}/login`;
        const reqPayload = { email, password };
        const response = await axios.post(reqUrl, reqPayload);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const updatepass = async ({ name, password, newPassword,token }) => {
    try {
        const reqUrl = `${backendUrl}/updatepass`;
        const reqPayload = { name, password, newPassword, token };
        const response = await axios.post(reqUrl, reqPayload);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};