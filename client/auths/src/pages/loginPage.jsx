import LoginForm from "../components/loginForm";

const LoginPage = () => {
  return (
    // This container ensures the form is perfectly centered on the screen
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
};

export default LoginPage;