import axios from "axios";

import { BASE_URL } from "../constants/index";


const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    timeoutErrorMessage: "API Request timeout",
});

export default instance;