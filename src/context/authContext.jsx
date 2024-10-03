import { useContext,createContext,useEffect,useState } from "react"
import { auth } from "../../firebase"
import { GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged,getAdditionalUserInfo } from "firebase/auth"
import { useDispatch } from "react-redux";
import { saveUser, signUpUser } from "../store/users/userThunk.jsx";
import PropTypes from "prop-types";


const AuthContext = createContext();


export const AuthcontextProvider = ({children})=>{

const [user, setUser] = useState({});
const dispatch = useDispatch();

    const googleSignIn = async()=>{
        try {

            const provider = new GoogleAuthProvider();
            const userInfo = await signInWithPopup(auth,provider);
            if((getAdditionalUserInfo(userInfo))?.isNewUser){
                const displayName = userInfo?.user?.displayName;
                const email = userInfo?.user?.email;
                const photoURL = userInfo?.user?.photoURL;
                const provider = userInfo?.providerId;

                const data = {
                    firstName : displayName.split(" ")[0],
                    lastName : displayName.split(" ")[1] || "",
                    email,
                    signupProvider : provider,
                    profilePic : photoURL,
                }

                //api call createUser
                dispatch(signUpUser(data))
                return;
            }
            //api to save
      dispatch(saveUser({email:userInfo?.user?.email}))

        } catch (error) {
            console.log(error);  
        }
    }

    const logOut = () => {
        signOut(auth);
        localStorage.removeItem("accessToken");
      };


      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if(currentUser) {
            setUser(currentUser);
          }
        });
        return () => {
          unsubscribe();
        };
      }, []);


      return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut}}>
          {children}
        </AuthContext.Provider>
      );
}

export const UserAuth = () => {
    return useContext(AuthContext);
  };

  AuthcontextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  }