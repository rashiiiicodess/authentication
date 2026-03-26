import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext"; // Import your hook
import TwoVerification from "../components/TwoVerification";

const Verify2FA = () => {
    const navigate = useNavigate();
    const { login } = useSession(); // Get the login function

    const handleVerification = async (data) => {
        if (data) {
            // Update the global state with the verified user data
            // This ensures user.isMfaActive (or similar) is true everywhere
            login(data.username || data); 
            navigate("/");
        }
    };

    const handle2FAReset = async (data) => {
        if (data) {
            // After reset, we go back to setup to generate a new QR code
            navigate("/setup-2fa");
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <TwoVerification 
                onVerifySuccess={handleVerification}
                onResetSuccess={handle2FAReset}
            />
        </div>
    );
};

export default Verify2FA;