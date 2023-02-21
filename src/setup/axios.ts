import axios from "axios"

export default axios.create({
    baseURL: import.meta.env.API_URL,
    timeout: 10000,
    headers: {
        "Authorization": `${localStorage.getItem("authorization")}`
    }
});
