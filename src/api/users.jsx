import axios from "../interceptor/interceptor.jsx";
const URL = import.meta.env.VITE_APP_API_BASE_URL;

const signUpUser = async (data)=>{
    return await axios.post(URL + "/users", data);
  }

  const  loginUser = async (email)=>{
    return await axios.post(URL + "/users/login",email);
  }
  export {
    signUpUser,
    loginUser,
  };