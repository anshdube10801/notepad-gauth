import axios from "axios";

axios.interceptors.request.use(
    async(config)=>{
        const token = localStorage.getItem("accessToken")
        if(token){
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
)

axios.interceptors.response.use(
    (response) =>{
        return response;
    },
    async function (error) {
        if(error?.response?.status === 401){
            console.log("session expired");
            localStorage.removeItem("accessToken");
            window.location.href = "/"
        }
        return Promise.reject(error);
    }
);

export default axios;