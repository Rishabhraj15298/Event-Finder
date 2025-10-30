const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-gray-600 mt-2 text-lg">Page Not Found</p>
      <a href="/" className="mt-4 text-black underline hover:opacity-80">
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
