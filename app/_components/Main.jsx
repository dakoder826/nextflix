export default function Main({ children }) {
  return (
    <main className="mt-8 flex h-[calc(100vh-4.5rem-3*1.5rem)] justify-center gap-8">
      {children}
    </main>
  );
}
