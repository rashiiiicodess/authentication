import LoginForm from "../components/loginForm";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
const LoginPage = () => {
    const navigate=useNavigate();
    const {login}=useSession();
    const handleLoginSuccess=(userData)=>{
        console.log("THe logged in userdata:",userData);
        login(userData);
        if(!userData.isMfaActive)
        {
            navigate("/setup-2fa")
        }
        else
        {
            navigate("/verify-2fa");
        }
        
        

    }
  return (
    // This container ensures the form is perfectly centered on the screen
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <LoginForm  onLoginSuccess={handleLoginSuccess}/>
    </div>
  );
};

export default LoginPage;