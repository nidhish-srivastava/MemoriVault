"use client";

import Modal from "./ui/Dialog";
import { useState, useRef, useEffect } from "react";
import { XIcon } from "./Icons/XIcon";
import { SpinnerIcon } from "./Icons/Spinner";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import {  createCapsule } from "@/lib/actions/capsule.actions";

export default function CapsuleDialog() {
  const [open, setOpen] = useState(false);
  
  const formRef = useRef(null);

  return (
    <>
      <button
        className="px-3 py-2 mt-2 text-lg bg-orange-900 hover:bg-orange-800 ease-in duration-300 text-stone-50 max-w-max"
        onClick={() => setOpen(true)}
      >
        Create a time capsule
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
  <div className="flex flex-col gap-8 font-sans bg-gray-900 text-gray-100 p-6 rounded-lg">
    <div className="flex justify-between">
      <h2 className="text-2xl font-bold leading-none">Create a time capsule</h2>
      <button
        className="text-base text-gray-300 hover:text-gray-400 focus:outline-none"
        onClick={() => setOpen(false)}
      >
        <XIcon />
      </button>
    </div>
    <form
      className="flex flex-col gap-6"
      ref={formRef}
      action={async (formData) => {
        await createCapsule(formData);
        formRef.current?.reset();
        toast.success("Capsule created successfully!");
        setOpen(false);
      }}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-gray-300">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          placeholder="Give your time capsule a name"
          className="p-2 outline-none bg-gray-800 focus:ring-2 ring-orange-500 placeholder-gray-400"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-gray-300">Description (optional)</label>
        <textarea
          name="description"
          id="description"
          placeholder="Describe your time capsule"
          className="p-2 outline-none  bg-gray-800 focus:ring-2 ring-orange-500 placeholder-gray-300"
        />
      </div>
      <div className="flex justify-end">
        <SubmitBtn />
      </div>
    </form>
  </div>
</Modal>

    </>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      className="px-3 py-2 text-base bg-orange-900 text-stone-50 max-w-max"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <p className="flex gap-2 items-center">
          <SpinnerIcon className="h-6 w-6" />
          <span>Creating...</span>
        </p>
      ) : (
        "Create capsule"
      )}
    </button>
  );
}