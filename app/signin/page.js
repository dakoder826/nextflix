import SignInButton from "@/app/_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="mt-10 flex flex-col items-center gap-10">
      <h2 className="text-3xl font-semibold">Continue with google</h2>
      <SignInButton />
    </div>
  );
}
