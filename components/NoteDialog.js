"use client";

import Modal from "./ui/Dialog"; 
import { useState, useRef } from "react";
import { XIcon } from "./Icons/XIcon"; 
import { SpinnerIcon } from "./Icons/Spinner";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { addNote } from "@/lib/actions/item.actions";
import AddNote from "./Icons/AddNote";

export default function NoteDialog({
  capsuleId,
  disabled,
}) {
  const [open, setOpen] = useState(false);
  const formRef = useRef(null);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <button
        className="w-full h-full text-lg text-gray-300 disabled:cursor-not-allowed disabled:opacity-50 font-bold flex flex-col gap-1 justify-center items-center"
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        <AddNote/>
        Add new note
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <div className="flex flex-col gap-8 font-sans bg-gray-900 text-gray-100 p-6 rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold leading-none">Add a note to your time capsule</h2>
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
              formData.append("capsuleId", capsuleId);
              await addNote(formData);
              formRef.current?.reset();
              toast.success("Note added successfully!");
              setOpen(false);
            }}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="text-gray-300">Description (optional)</label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="A brief description of your note (optional)"
                className="p-2 outline-none bg-gray-800 focus:ring-2 ring-orange-500 placeholder-gray-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-gray-300">Note</label>
              <textarea
                name="notes"
                id="notes"
                required
                placeholder="Your notes..."
                className="p-2 outline-none bg-gray-800 focus:ring-2 ring-orange-500 placeholder-gray-400"
              />
            </div>
            <div className="flex justify-start">
              <SubmitBtn />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="px-3 py-2 text-lg bg-orange-900 hover:bg-orange-800 ease-in duration-300 text-stone-50 max-w-max"
    >
      {pending ? (
        <p className="flex gap-2 items-center">
          <SpinnerIcon className="h-6 w-6" />
          <span>Adding note...</span>
        </p>
      ) : (
        "Add note"
      )}
    </button>
  );
};