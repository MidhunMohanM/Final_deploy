import Cookies from "js-cookie";


const getToken = (token = 'user_auth_token') => {
    const auth_token = Cookies.get(token) || sessionStorage.getItem(token);
    return auth_token;
}

const setToken = ({rememberMe, auth_token, token}) => {
    if (rememberMe) {
        // Chnange secure to true in dvelopment mode
        Cookies.set(token, auth_token, { expires: 30, secure: false, sameSite: 'Lax' });
    }
    else {
        sessionStorage.setItem(token, auth_token);
    }
}

const removeToken = (token) => {
    Cookies.remove(token);
    sessionStorage.removeItem(token);
}

export {getToken, setToken, removeToken};