import Navbar from "@/components/Navbar";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import CapsuleModel from "@/models/capsule.model";
import LockDialog from "@/components/LockDialog";
import CapsuleCountdown from "@/components/CapsuleCountdown";
import UploadDialog from "@/components/UploadDialog";
import NoteDialog from "@/components/NoteDialog";
import CapsuleContent from "@/components/CapsuleContent";
import ItemModel from "@/models/item.model";
import CapsuleCreatedIcon from "@/components/Icons/CapsuleCreated";
import CapsuleLockedIcon from "@/components/Icons/CapsuleLocked";
import CapsuleOpenIcon from "@/components/Icons/CapsuleOpen";
import FileIcon from "@/components/Icons/File";
import NoteIcon from "@/components/Icons/Note";

async function getCapsuleData(id) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const capsule = await CapsuleModel.findById(id) 
  return capsule
}

async function getCapsuleItems(id){
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const capsuleItems = await ItemModel.find({timeCapsuleId : id})
  return capsuleItems
}

export default async function Page({ params }) {
  const capsule = await getCapsuleData(params.id)
  const capsuleItems = await getCapsuleItems(params.id)
  if (!capsule || !capsuleItems) {
    redirect("/");
  }
  return (
    <main className="font-sans flex flex-col items-center min-h-screen min-w-screen gap-4 overflow-x-hidden bg-black text-white">
      <Navbar page="Capsule" />
      <section className="lg:w-2/3 md:w-4/5 pt-8 lg:pt-12 p-4 lg:p-0 flex flex-col gap-6 w-full min-h-screen">
        <div className="flex w-full flex-col lg:flex-row gap-3 justify-between lg:items-center">
          <h2 className="lg:text-3xl text-xl font-bold">{capsule?.name}</h2>
          {!capsule.locked ? (
            <div className="flex gap-3 items-center">
              <LockDialog capsule={capsule} />
              <CapsuleContent capsule={capsule} capsuleItems={capsuleItems}/>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {capsule.locked && (
                <span className="text-sm text-gray-300">
                  Time until capsule can be opened ~
                </span>
              )}
              <CapsuleCountdown
                openingDate={capsule?.openingDate}
                capsuleId={capsule?._id}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <p>{capsule?.description}</p>
          <div className="flex lg:flex-row flex-col gap-3 w-full">
            <div className="flex gap-3 w-full">
              <div className="bg-gray-700/90 w-full aspect-square p-4 flex flex-col justify-center font-sans overflow-hidden relative">
                <FileIcon/>
                <h2 className="text-8xl font-black leading-none z-10">
                  {capsuleItems
                    ?.filter((item) => item.type === "file")
                    .length.toString()
                    .padStart(2, "0")}
                </h2>
                <p className="text-3xl font-bold z-10 text-gray-300">
                  {capsuleItems?.filter((item) => item.type === "file")
                    .length === 1
                    ? "File"
                    : "Files"}
                </p>
              </div>
              <div className="bg-gray-700/90 w-full aspect-square p-4 flex flex-col justify-center font-sans relative overflow-hidden">
                <NoteIcon/>
                <h2 className="text-8xl font-black leading-none z-10">
                  {capsuleItems
                    ?.filter((item) => item.type === "note")
                    .length.toString()
                    .padStart(2, "0")}
                </h2>
                <p className="text-3xl font-bold z-10 text-gray-300">
                  {capsuleItems?.filter((item) => item.type === "note")
                    .length === 1
                    ? "Note"
                    : "Notes"}
                </p>
              </div>
            </div>
            <div className="flex gap-3 md:flex-row flex-col w-full">
              <div className="bg-gray-700/90 w-full aspect-square cursor-pointer hover:bg-gray-700/70">
                <UploadDialog
                  capsuleId={capsule?.id}
                  disabled={capsule.locked}
                />
              </div>
              <div className="bg-gray-700/90 w-full aspect-square cursor-pointer hover:bg-gray-700/70">
                <NoteDialog
                  capsuleId={capsule?.id}
                  disabled={capsule.locked}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 leading-none w-full h-full">
          <p>
            <CapsuleCreatedIcon/>
            Capsule created ~ {capsule?.createdAt.toLocaleDateString("en-US")}
          </p>
          <p>
            <CapsuleLockedIcon/>
            Capsule locked ~ {capsule?.locked ? "yes" : "no"}
          </p>
          <p>
            <CapsuleOpenIcon/>
            Capsule opens ~{" "}
            {capsule?.openingDate
              ? capsule?.openingDate.toLocaleDateString("en-US")
              : "N/A"}
          </p>
        </div> 
      </section>

    </main>
  );
}
