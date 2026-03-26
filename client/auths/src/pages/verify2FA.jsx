const Verify2FA = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Verify 2FA Code</h1>
      <input 
        type="text" 
        placeholder="Enter 6-digit code" 
        className="mt-4 p-2 bg-gray-800 border border-gray-700 rounded text-center"
      />
    </div>
  );
};

export default Verify2FA;