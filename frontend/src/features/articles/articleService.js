import axios from "axios"

const API_URL = "/api/articles/"

// Create a new goal
export const createArticle = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL, goalData, config)
    return response.data
}

// Get goals
export const getArticles = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(API_URL + "byName", config)
    return response.data
}


// Get goals
export const getArticlesAll = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

// Delete user article
export const deleteItem = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.delete(API_URL + id, config)
    return response.data
}

const goalService = {
    createArticle,
    getArticles,
    deleteItem,
    getArticlesAll
}

export default goalService