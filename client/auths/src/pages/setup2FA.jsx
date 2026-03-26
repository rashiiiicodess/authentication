import Setup2FA from "../components/TwoFASetup";

const Setup2FAPage = () => {
  return (
    <main className="bg-gray-950">
      {/* We wrap the component in a page-level container 
          in case you want to add a Sidebar or Navbar later 
      */}
      <Setup2FA/>
    </main>
  );
};

export default Setup2FAPage;