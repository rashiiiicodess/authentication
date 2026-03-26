import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setup2FA } from "../services/authApi";

const Setup2FA = () => {
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const { data } = await setup2FA();
        // data.qrCode is the base64 string from your backend
        setQrCode(data.qrCode);
        setSecret(data.secret);
      } catch (err) {
        setError("Failed to generate QR code. Please try again.");
        console.error(err);
      } 
    };

    fetchQRCode();
  }, []);

 

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Secure Your Account</h2>
        <p className="text-gray-400 mb-8">Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)</p>

        {error ? (
          <p className="text-red-400 mb-4">{error}</p>
        ) : (
          <div className="space-y-6">
            {/* The QR Code Image */}
            <div className="bg-white p-4 rounded-xl inline-block shadow-inner">
              {qrCode && <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />}
            </div>

            {/* Manual Entry Fallback */}
            <div className="text-left bg-black/40 p-4 rounded-xl border border-gray-800">
              <p className="text-xs text-gray-500 uppercase font-bold mb-1 ml-1">Manual Entry Key</p>
              <p className="text-blue-400 font-mono break-all text-sm select-all">
                {secret}
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate("/verify-2fa")}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95"
              >
                I've scanned the code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setup2FA;