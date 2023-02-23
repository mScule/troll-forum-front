import jwtDecode from "jwt-decode"

// When accessing user id from react components, don't use this function
// directly! Access everything user related through UserContext

export default function getUserId() {
    const authToken = localStorage.getItem("authorization");

    if (!authToken) {
        return 0;
    }

    try {
        return (jwtDecode(authToken) as { data: { id: number } }).data.id
    } catch {
        return 0;
    }
}
