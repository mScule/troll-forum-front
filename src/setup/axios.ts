import axios from "axios"

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        "Authorization": `${localStorage.getItem("authorization")}`
    }
});

export default instance;
