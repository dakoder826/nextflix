import { auth } from "../_lib/auth";
import Logo from "./Logo";
import NumResults from "./NumResults";
import Search from "./Search";
import Image from "next/image";
import LogOutButton from "./SignOutIcon";
import SignInIcon from "./SignInIcon";
import SignOutIcon from "./SignOutIcon";

async function Header() {
  const session = await auth();
  return (
    <header className="grid h-20 grid-cols-3 items-center rounded-lg bg-primary-dark px-5">
      <Logo />
      <Search />
      <div className="flex items-center justify-end gap-4">
        <NumResults />
        {session?.user ? (
          <>
            <Image
              className="h-8 w-8 rounded-full"
              src={session?.user?.image}
              alt={session.user.name}
              referrerPolicy="no-referrer"
              width={32} // Explicit width to prevent layout shifts
              height={32} // Explicit height to prevent layout shifts
            />
            <SignOutIcon />

            {/* <p>{session.user.name.split(" ")[0]}</p>{" "} */}
          </>
        ) : (
          <SignInIcon />
        )}
      </div>
    </header>
  );
}

export default Header;
