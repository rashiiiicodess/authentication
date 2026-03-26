import { useState } from "react";
import { register, login } from "../services/authApi";

const LoginForm = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => { 
         e.preventDefault();
        setError("");
        setMessage("");

        try {
            const { data } = await login(username, password);
            setIsRegister(false);
            setMessage(data.message);
            setUsername("");
            setPassword("");

        }
        catch (error) {
            console.log("The err is:", error.message);
            setUsername("");
            setPassword("");

            setError("Invalid credentials");
        }

    };
    
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        // 2. Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return; // Stops the function here so no API call is made
        }
        try {
            const { data } = await register(username, password);
            setIsRegister(false);
            setMessage(data.message);
            setUsername("");
            setPassword("");
            setConfirmPassword("");
        }
        catch (error) {
            console.log("The err is:", error.message);
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setError("Something went wrong during user registration");
        }
    };

    return (
        <form onSubmit={isRegister ? handleRegister : handleLogin} className="w-full max-w-md rounded-2xl bg-gray-900/50 backdrop-blur-xl p-8 shadow-2xl border border-gray-800">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    {isRegister ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="mt-2 text-gray-400">
                    {isRegister ? "Join our community today" : "Log in to manage your 2FA settings"}
                </p>
            </div>

            <div className="my-6 border-t border-gray-800" />

            <div className="space-y-5">
                {/* Fixed Styling for Error and Message */}
                {error && (
                    <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-500/50 rounded-lg text-center">
                        {error}
                    </div>
                )}
                {message && (
                    <div className="p-3 text-sm text-green-400 bg-green-900/20 border border-green-500/50 rounded-lg text-center">
                        {message}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="w-full rounded-xl bg-gray-800/50 border border-gray-700 p-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl bg-gray-800/50 border border-gray-700 p-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                    />
                </div>

                {isRegister && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-xl bg-gray-800/50 border border-gray-700 p-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            required
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full cursor-pointer rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-500 hover:-translate-y-0.5 active:scale-95"
                >
                    {isRegister ? "Register" : "Sign In"}
                </button>

                <div className="pt-2 text-center">
                    <p className="text-sm text-gray-500">
                        {isRegister ? "Already have an account? " : "New to the platform? "}
                        <button
                            type="button"
                            onClick={() => {
                                setIsRegister(!isRegister);
                                setError(""); // Clear messages on switch
                                setMessage("");
                            }}
                            className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            {isRegister ? "Login here" : "Create one now"}
                        </button>
                    </p>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;