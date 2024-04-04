import axios from "axios";

export function IsLogged() {
    return new Promise((resolve) => {
        if (localStorage.getItem("JWT_auth_KillerBee")) {
            axios.post(import.meta.env.VITE_URL_MS_AUTH + "/verify", null, {
                params: {
                    token: localStorage.getItem("JWT_auth_KillerBee"),
                },
            }).then((response) => {
                if (response.data.check !== false) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch((error) => {
                console.log(error);
                resolve(false);
            });
        } else {
            resolve(false);
        }
    });
}
