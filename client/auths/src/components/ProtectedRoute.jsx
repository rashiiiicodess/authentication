


const ProtectedRoute=()=>{
    const isLoggedIn=true;
    return isLoggedIn?<Outlet/>:<Navigate to="/login"></Navigate>

};
export default ProtectedRoute