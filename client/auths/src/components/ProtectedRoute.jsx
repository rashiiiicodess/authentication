import { Navigate, Outlet } from "react-router-dom";
import {useSession} from "../context/SessionContext";

const ProtectedRoute=()=>{
   const {isLoggedIn}=useSession();

    return isLoggedIn?<Outlet/>:<Navigate to="/login"></Navigate>

};
export default ProtectedRoute