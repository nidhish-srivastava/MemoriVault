import { auth } from "@/app/auth";
import SignIn from "./Auth";
import UserMenu from "./UserMenu";
import { Raleway } from "next/font/google";
import Link from "next/link";

// Import Raleway font subset
const raleway = Raleway({ subsets: ["latin"] });

export async function SideStuff() {
  const session = await auth();
  if (session?.user) return <UserMenu session={session} />;
  return <SignIn label="Get Started" />;
}

export default function Navbar() {
  return (
    <div className="p-4 w-full flex justify-between items-center text-white">
      {/* Set text color to white and background to dark gray */}
      <Link href={`/`} className={`text-3xl text-orange-400 font-bold ${raleway.className}`}>
        SecretVault
      </Link>
      <SideStuff />
    </div>
  );
}
