// import { useState,useEffect,useContext,createContext } from "react";
// import axios from "axios";
// const AuthContext = createContext()
// const AuthProvider =({children}) =>{
//     const [auth,setAuth]=useState({
//         user:null,
//         token:" "
//     })
 
//     //default axios
//     axios.defaults.headers.common["Authorization"] = auth?.token;
//     useEffect(() =>{
//         const data = localStorage.getItem("auth");
//         if(data){
//             const parseData =JSON.parse(data);
//             setAuth({
//                 ...auth,
//                 user:parseData.user,
//                 token:parseData.token,
//                 bio:parseData.bio,
//             });
            
//         }
//     },[]);
//     console.log(setAuth);
//     return (
//         <AuthContext.Provider value ={{auth,setAuth}}>
//         {children}
//         </AuthContext.Provider>
//     )
// }
// //custom hooks

// const useAuth = () => {
//     const [auth, setAuth] = useContext(AuthContext);
//     const fname = auth.user?.fname; // access fname property
//     const bio = auth.user?.bio; 
//     return { auth, setAuth, fname,bio}; // return auth, setAuth, and fname
//   };
  
//   export { useContext,AuthContext,useAuth, AuthProvider };


import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
   
  });



 useEffect(() => {
    axios.defaults.headers.common["Authorization"] = auth.token;
  }, [auth,auth.token]);

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth(parseData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const fname = auth?.user?.fname; // access fname property
  const bio = auth?.user?.bio;
  return { auth, setAuth, fname, bio }; // return auth, setAuth, and fname
};

export { useContext, AuthContext, useAuth, AuthProvider };