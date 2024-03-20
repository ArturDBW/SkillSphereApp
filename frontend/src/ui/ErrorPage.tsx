import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex h-[calc(100vh-72px)] flex-col items-center justify-center space-y-2">
      <span className="text-9xl text-yellow-500">404</span>
      <span className="text-2xl font-bold">Page not found</span>
      <span className="text-lg">
        Oops! The page you are looking for does not exist.
      </span>
      <Link
        to="/"
        className="rounded-xl bg-yellow-500 px-6 py-3 duration-150 hover:bg-yellow-400"
      >
        Back to home
      </Link>
    </div>
  );
}
