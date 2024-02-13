import axios from "axios";

export const getAllFeedbacks = async () => {
    return axios.get(`${import.meta.env.VITE_API_URL}/feedbacks`);
};

export const createFeedback = async ({
    rating,
    comment,
    appointment,
    verify,
}) => {
    return axios.post(`${import.meta.env.VITE_API_URL}/feedbacks`, {
        rating,
        comment,
        appointment,
        verify,
    });
};

export const updateFeedback = async (id, { rating, comment, verify }) => {
    return axios.patch(`${import.meta.env.VITE_API_URL}/feedbacks/${id}`, {
        rating,
        comment,
        verify,
    });
};

export const deleteFeedback = async (id) => {
    return axios.delete(`${import.meta.env.VITE_API_URL}/feedbacks/${id}`);
};
