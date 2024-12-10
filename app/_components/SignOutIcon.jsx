import { VscSignOut } from "react-icons/vsc";

import { signOutAction } from "@/app/_lib/actions";

function SignOutIcon() {
  // Has to be a form when calling the Auth.js sign in or sign out function
  return (
    <form
      className="hover:text-icon-hover flex items-center gap-2 font-semibold transition-colors"
      action={signOutAction}
    >
      <button className="flex items-center">
        <VscSignOut className="text-3xl" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutIcon;
