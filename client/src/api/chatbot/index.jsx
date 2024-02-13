import axios from "axios";

export const postChatbot = async (message) => {
    return axios.post(`${import.meta.env.VITE_API_URL}/chatbot`, {
        message: message,
    });
};
