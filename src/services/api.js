import axios from "axios";

export const api = axios.create({
    baseURL: "https://gdantasit-rocketnotes.onrender.com"
    // baseURL: "http://localhost:3333"

});

