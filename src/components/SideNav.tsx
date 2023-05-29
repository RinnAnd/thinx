import { FC } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import IconHoverEffect from "./IconHoverEffect";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";

interface SideNavProps {}

const SideNav: FC<SideNavProps> = ({}) => {
  const session = useSession();
  const user = session.data?.user;
  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-center gap-2 whitespace-nowrap">
        <li>
          <Link href="/">
            <IconHoverEffect>
              <span className="flex items-center gap-4">
                <VscHome className="h-6 w-6"/>
              </span>
            </IconHoverEffect>
          </Link>
        </li>
        <li>
          {user != null && (<Link href={`/profiles/${user.id}`}>
          <IconHoverEffect>
              <span className="flex items-center gap-4">
                <VscAccount className="h-6 w-6"/>
              </span>
            </IconHoverEffect>
          </Link>)}
        </li>
        {user == null ? (
          <li>
            <button onClick={() => signIn()}>
            <IconHoverEffect>
              <span className="flex items-center gap-4">
                <VscSignIn className="h-6 w-6"/>
              </span>
            </IconHoverEffect>
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => signOut()}>
            <IconHoverEffect>
              <span className="flex items-center gap-4">
                <VscSignOut className="h-6 w-6"/>
              </span>
            </IconHoverEffect>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SideNav;
