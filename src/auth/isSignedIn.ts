import axios from "../setup/axios"

export default async function isSignedIn() {
    try {
        const response = await axios.get("auth")
        if (response.status === 200) {
            return true
        }
    } finally {
        return false
    }
}
