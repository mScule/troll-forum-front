import jwtDecode from "jwt-decode"

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
