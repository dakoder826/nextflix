import Link from "next/link";

function NotFound() {
  return (
    <main className="mt-4 space-y-6 p-10 text-center">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="text-primary-800 inline-block bg-primary-light px-6 py-3 text-lg hover:bg-primary-dark"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;