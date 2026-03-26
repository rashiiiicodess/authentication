import { Navigate, Outlet } from "react-router-dom";
import {useSession} from "../context/SessionContext";

const ProtectedRoute=()=>{
   const {isLoggedIn,loading}=useSession();
    if(loading)
        return null;
    return isLoggedIn?<Outlet/>:<Navigate to="/login"></Navigate>

};
export default ProtectedRoute