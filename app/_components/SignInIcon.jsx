import Link from "next/link";
import { VscSignIn } from "react-icons/vsc";

function SignInIcon() {
  return (
    <Link
      className="hover:text-icon-hover flex items-center font-semibold transition-colors hover:cursor-pointer"
      href="/signin"
    >
      <VscSignIn className="mr-1 text-3xl" />
      <span>Sign in</span>
    </Link>
  );
}

export default SignInIcon;
