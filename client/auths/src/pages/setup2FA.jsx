
const Setup2FA = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Setup Two-Factor Authentication</h1>
      <div className="mt-6 p-4 bg-white rounded">
        {/* QR Code will render here */}
        <div className="w-48 h-48 bg-gray-300 flex items-center justify-center text-black">QR Code Placeholder</div>
      </div>
    </div>
  );
};

export default Setup2FA;