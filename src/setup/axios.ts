import axios from "axios"
/**
 * Axios setup that fetches the authorization token automatically, and
 * Calls the API URL stated in .env files
 */
function createInstance() {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 10000,
    });

    instance.interceptors.request.use((config) => {
        config.headers.Authorization = localStorage.getItem("authorization")
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    return instance
}

const globalInstance = createInstance();
export default globalInstance;
