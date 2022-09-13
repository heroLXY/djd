import VueCookies from "vue-cookies";

export const setUser = (user) => {
    VueCookies.set("user", user, 60 * 60);
};

export const getUser = () => {
    return VueCookies.get("user");
};

export const setToken = (token) => {
    VueCookies.set("token", token, 60 * 60);
};

export const getToken = () => {
    return VueCookies.get("token");
};