import { auth } from "@/app/auth";
import SignIn from "./Auth";
import UserMenu from "./UserMenu";
import {Raleway } from "next/font/google";
import Link from "next/link";

export async function SideStuff() {
  const session = await auth()
  if (session?.user) return <UserMenu session={session} />;
  return <SignIn label="Get Started" />;
}

const raleway = Raleway({subsets : ['latin']})

export default function Navbar() {
  return (
    <div className="p-4 w-full flex justify-between items-center">
      <Link href={`/`} className={`text-3xl text-orange-800 font-bold ${raleway.className}`}>Reminx</Link>
      <SideStuff />
    </div>
  );
}