/* eslint-disable @next/next/no-img-element */

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className=" font-sans flex flex-col items-center min-h-screen min-w-screen gap-10 overflow-x-hidden relative text-white">
      <Navbar />
      <div className="flex flex-col lg:w-2/3 w-full p-4">
        <h2 className="font-serif text-center text-6xl sm:text-7xl font-black text-gray-100 lg:max-w-4xl">
          Your life's{" "}
          <span className="text-orange-400">time-travelling</span> odyssey starts
          here.
        </h2>
        <p className="text-xl font-light mt-3 text-center">
          With MemoriVault, you can securely store your most sensitive information, memories, and secrets, locking them away until the perfect moment arises. Whether it's cherished memories, vital passwords, or confidential access keys, MemoriVault ensures they're safely stored, ready to be unlocked when the time is right.
        </p>
      </div>
      <div className="grid grid-cols-5 gap-10 py-4 w-[95%] mx-auto">
        <img
          src="https://images.unsplash.com/photo-1635439127087-0fe6a481bde5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="-rotate-[4deg]"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1701959827370-1ced5e4f7721?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="rotate-[4deg]"
        />
        <img
          src="https://images.unsplash.com/photo-1702329554065-efd758889d77?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="-rotate-[4deg]"
        />
        <img
          src="https://images.unsplash.com/photo-1682686580922-2e594f8bdaa7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="rotate-[4deg]"
        />
        <img
          src="https://images.unsplash.com/photo-1657070174397-569b53c68e29?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="-rotate-[4deg]"
        />
      </div>
      {/* <Footer /> */}
    </main>
  );
}
