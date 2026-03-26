import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-900 text-white">
      <h1 className="text-5xl font-bold">Oops!</h1>
      <p className="mt-4 text-xl">Something went wrong.</p>
      <p className="mt-2 text-red-300 font-mono italic">
        {error.statusText || error.message}
      </p>
    </div>
  );
};

export default Error;