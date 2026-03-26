import { createContext,useContext,useState,useEffect } from "react";

import { authStatus } from "../services/authApi";
const SessionContext=createContext();

export const useSession=()=>useContext(SessionContext);

export const SessionProvider=({children})=>{

    const[isLoggedIn,setIsLoggedIn]=useState(false);
    const[user,setUser]=useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const verifySession = async () => {
        console.log("1. Starting session verification...");
        // Inside verifySession in SessionContext.jsx
try {
    const { data } = await authStatus(); 
    console.log("2. Server responded with:", data);
    
    // CHANGE THIS LINE: Check for 'username' or 'user' instead of 'isLoggedIn'
    if (data.username || data.user) { 
        setIsLoggedIn(true);
        // If your server sends {username, isMfaActive} directly:
        setUser(data); 
        // If your server sends {user: {username, isMfaActive}}:
        // setUser(data.user);
    }
}
       catch (err) {
        // Cookie is invalid or expired
        console.error("3. Verification failed:", err.response?.status);
        setIsLoggedIn(false);
      } finally {
        setLoading(false); // 3. We are done checking, now show the app
        console.log("4. Loading set to false");
      }
    };

    verifySession();
  }, []);

    const login=(userData)=>{
        setIsLoggedIn(true);
        setUser(userData);
    }
    const logout=(data)=>{
        if(data)
        {
            setIsLoggedIn(false);
            setUser(null);
        }
    }
    if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-blue-500 animate-pulse font-mono">Verifying Session...</div>
      </div>
    );
  }
    return(
        <SessionContext.Provider value={{isLoggedIn,user,login,logout,loading}}>{children}</SessionContext.Provider>
    )

}