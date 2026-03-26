import { useState } from "react";
import { verify2FA, reset2FA } from "../services/authApi"; // Ensure both come from your API service

const TwoVerification = ({ onVerifySuccess, onResetSuccess }) => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    const handleTokenVerification = async (e) => {
        e.preventDefault();
        try {
            const { data } = await verify2FA(otp);
            onVerifySuccess(data);
        } catch (error) {
            setOtp("");
            // Use the error message from the backend if it exists
            const msg = error.response?.data?.message || "Invalid OTP";
            setError(msg); 
        }
    };

    const handleReset = async () => {
        try {
            const { data } = await reset2FA();
            onResetSuccess(data);
        } catch (error) {
            setError(error.response?.data?.message || "Reset failed");
        }
    };

    return (
        <form onSubmit={handleTokenVerification} className="p-6 bg-gray-900 text-white rounded-lg">
            <div>
                <h2 className="text-xl font-bold">Validate OTP</h2>
            </div>
            <hr className="my-4 border-gray-700" />
            <p className="mb-4 text-gray-400">Please enter 6 digit time-based OTP</p>
            
            <div className="space-y-4">
                <div>
                    <label className="block mb-1">TOTP</label>
                    <input 
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)} // Fixed this!
                        placeholder="Enter your TOTP"
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-center tracking-widest"
                        required 
                    />
                </div>
                
                {/* Fixed the error display: just {error} since it's a string */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                
                <div className="flex flex-col gap-2">
                    <button type="submit" className="bg-blue-600 p-2 rounded hover:bg-blue-500">
                        Verify TOTP
                    </button>
                    <button type="button" onClick={handleReset} className="text-gray-400 hover:text-white text-sm">
                        Reset 2FA
                    </button>
                </div>
            </div>
        </form>
    );
};

export default TwoVerification;