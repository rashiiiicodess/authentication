import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { logoutUser } from "../services/authApi"; // Import your API logout call

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useSession();

  const handleLogout = async () => {
    try {
      // 1. Tell the server to clear the session cookie
      await logoutUser(); 
      
      // 2. Clear the local React state (isLoggedIn = false, user = null)
      logout(true); 
      
      // 3. Send them back to the start
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
      // Even if the server call fails, we usually clear the local state for safety
      logout(true);
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-gray-900 p-10 rounded-3xl border border-gray-800 shadow-2xl max-w-md w-full">
        <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🎉</span>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">
          Welcome, <span className="text-blue-500">{user?.username || "User"}</span>!
        </h2>
        
        <p className="text-gray-400 mb-8 leading-relaxed">
          You have successfully logged in and verified your account with 2FA. 
          Your session is now secure.
        </p>
        
        <button 
          type="button" 
          onClick={handleLogout}
          className="w-full bg-red-600/10 hover:bg-red-600 border border-red-600/50 text-red-500 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300"
        >
          Logout Account
        </button>
      </div>
    </div>
  );
};

export default HomePage;