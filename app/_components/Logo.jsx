import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <span role="img" className="text-2xl">
        🍿
      </span>
      <h1 className="text-2xl font-semibold">Nextflix</h1>
    </Link>
  );
}
