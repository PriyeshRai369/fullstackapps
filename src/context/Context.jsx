import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from "react";

export const Context = createContext()

export default function ContextProvider({children}){
    const [userID, setUserID] = useState("");
  const [showNavMenu, setShowNavMenu] = useState(false);

  useEffect(() => {
    const userLoginId = Cookies.get("userID") || "";
    if (userLoginId) {
      setUserID(userLoginId);
      setShowNavMenu(true);
    }
  }, []);
  
  const contextValue = {userID,showNavMenu,setShowNavMenu,setUserID}



    return(
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}