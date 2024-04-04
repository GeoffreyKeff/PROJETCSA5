import axios from 'axios';

const setAuthTokenHeader = (token: string | null) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default setAuthTokenHeader;