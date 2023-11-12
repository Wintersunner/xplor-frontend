import axios from "../api/axios.js";
import useToast from "./useToast.js";

const useAxios = () => {
    const {setErrorToast} = useToast()
    axios.interceptors.response.use(
        response => response,
        error => {
            setErrorToast(error)
            return Promise.reject(error);
        }
    );

    return axios;
}

export default useAxios;