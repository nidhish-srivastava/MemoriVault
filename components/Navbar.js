import { auth } from "@/app/auth";
import SignIn from "./Auth";
import UserMenu from "./UserMenu";
import { Fjalla_One, Lalezar, Montserrat, Oswald, Raleway, Teko } from "next/font/google";

export async function SideStuff() {
  const session = await auth()
  if (session?.user) return <UserMenu session={session} />;
  return <SignIn label="Get Started" />;
}

const raleway = Raleway({subsets : ['latin']})

export default function Navbar() {
  return (
    <div className="p-4 w-full flex justify-between items-center">
      <div className={`text-3xl text-orange-800 font-bold ${raleway.className}`}>Reminx</div>
      <SideStuff />
    </div>
  );
}