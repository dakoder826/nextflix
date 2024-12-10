"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex flex-col items-center justify-center gap-6 p-16">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="bg-accent-500 text-primary-800 inline-block bg-primary-dark px-6 py-3 text-lg hover:bg-primary-light"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
