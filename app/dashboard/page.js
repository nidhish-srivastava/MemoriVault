/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import CapsuleDialog from "@/components/CapsuleDialog";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import CapsuleModel from "@/models/capsule.model";
import Link from "next/link";
import { connectToDB } from "@/lib/dbConnect";
import DashboardCardIcon from "@/components/Icons/DashboardCard";

async function Capsules() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  let capsules
  try {
    connectToDB()
    capsules = await CapsuleModel.find({userId : session.user.email})
  } catch (error) {
    
  }

  return (
    <section className="p-4 pt-0 min-w-full h-full  text-white">
      {capsules.length === 0 ? (
        <div className="flex flex-col justify-center items-center w-full gap-3 mt-4">
          <img
            src="https://illustrations.popsy.co/amber/surreal-hourglass.svg"
            className="h-[400px] w-[400px]"
            alt="empty-state"
          />
          <h2 className="text-3xl font-bold text-center">
            You haven&apos;t created any time capsules yet.{" "}
          </h2>
          <CapsuleDialog />
        </div>
        ) : (
         <div className="flex flex-col gap-6 w-full h-full min-h-screen">
          <div className="flex w-full flex-col lg:flex-row gap-3 justify-between lg:items-center">
            <h2 className="lg:text-3xl text-xl font-bold">Your capsules</h2>
            <CapsuleDialog />
          </div>
          <div className="grid lg:grid-cols-5 grid-cols-2 md:grid-cols-3 w-full gap-3">
            {capsules.map((capsule) => (
       <Link href={`/capsule/${capsule.id}`} key={capsule.id}>
       <div
         key={capsule.id}
         className="flex flex-col gap-3 justify-between aspect-square bg-gray-700 hover:bg-gray-600 p-2 w-full h-full ease-in duration-300 relative overflow-hidden"
       >
         <DashboardCardIcon/>
         <div className="flex flex-col gap-1 max-h-[90%] overflow-hidden">
           <h3 className="text-xl font-bold text-white z-10">{capsule.name}</h3>
           <p className="text-gray-300 z-10">{capsule.description}</p>
         </div>
         <span className="text-sm text-gray-400 z-10">
           {capsule.locked ? "Locked" : "Not locked"}
         </span>
       </div>
     </Link>
            ))}
          </div>
        </div>
      )} 
    </section>
  );
}

export default function Dashboard() {
  return (
    <main className=" font-sans flex flex-col items-center min-h-screen min-w-screen gap-4 overflow-x-hidden relative text-white">
      <Navbar page="Dashboard" />
      <Capsules />
      {/* <Footer /> */}
    </main>
  );
}
