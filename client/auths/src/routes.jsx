import {createBrowserRouter,Outlet} from "react-router-dom";
import LoginPage from "./pages/loginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import  Verify2FA from "./pages/verify2FA.jsx";
import Setup2FA from "./pages/setup2FA.jsx";
import Error from "./pages/Error";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export const router=createBrowserRouter([
    {
        path:"/login",
        element:<LoginPage/>,
        errorElement:<Error/>
    },
    
    {
        element:<ProtectedRoute/>,
        children:[
            {
        path:"/",
        element:<HomePage/>,
        errorElement:<Error/>
    },
             {
        path:"/setup-2fa",
        element:<Setup2FA/>,
        errorElement:<Error/>
    },
    {
        path:"/verify-2fa",
        element:<Verify2FA/>,
        errorElement:<Error/>
    },

        ]
    },
   
])