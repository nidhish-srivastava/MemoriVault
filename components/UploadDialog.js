"use client";

import Modal from "./ui/Dialog";
import { useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { XIcon } from "./Icons/XIcon";
import { SpinnerIcon } from "./Icons/Spinner";
import { resizeFile } from "@/lib/utils";
import { uploadImage } from "@/lib/actions/item.actions";
import UploadFileIcon from "./Icons/UploadFile";

export default function UploadDialog({
  capsuleId,
  disabled,
}) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const formRef = useRef(null);
  const [img, setImg] = useState("")

  const handleImage = (e) => {
    e.preventDefault()
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      setFile(file)
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          const image = await resizeFile(file)
          //* setImg(reader.result); -->we get base64 for image preview but not compressed
          setImg(image)  //* this is the compressed base64(though base64 has 33% more size)
          setOpen(true)
        };
        reader.readAsDataURL(file);
      }
    };

    fileInput.click();
  };


  return (
    <>
    <div className="w-full h-full flex justify-center items-center">
      <button
        className="w-full h-full text-lg disabled:cursor-not-allowed disabled:opacity-50 text-gray-300 font-bold flex flex-col gap-1 justify-center items-center"
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        <UploadFileIcon/>
        Upload a file
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <div className="flex flex-col gap-8 font-sans bg-gray-900 text-gray-100 p-6 rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold leading-none">
              Add an image to your time capsule
            </h2>
            <button
              className="text-base text-gray-300 hover:text-gray-400 max-w-max focus:outline-none"
              onClick={() => {
                setOpen(false)
                setImg("")
                setFile("")
              }}
            >
              <XIcon />
            </button>
          </div>
          <form
            className="flex flex-col gap-6"
            ref={formRef}
            action={async (formData) => {
              formData.append("file", img);
              formData.append("capsuleId", capsuleId);
              await uploadImage(formData);
              toast.success("File uploaded!");
              setOpen(false);
              formRef.current?.reset();
              setFile(null);
            }}
          >
            <button onClick={handleImage}>
              <div
                className="bg-gray-800 border border-dashed border-gray-600 p-2"
              >
                <p className="text-gray-400">
                  Upload an image
                </p>
              </div>
            </button>
            <img src={img} alt="" />
            {file && (
              <p className="text-gray-400 text-lg -mt-2">
                {file?.name} ({(file?.size / 1024 / 1024).toFixed(2).toString()}{" "}
                mb)
              </p>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-gray-400">Description (optional)</label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Describe your time capsule"
                className="p-2 outline-none bg-gray-800 focus:ring-2 ring-orange-500 placeholder-gray-400"
              />
            </div>
            <SubmitBtn />
          </form>
        </div>
      </Modal>
    </div>
  </>
  
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      className="px-3 py-2 text-lg hover:bg-orange-800 ease-in duration-300 bg-orange-900 text-stone-50 max-w-max"
      type="submit"
    >
      {pending ? (
        <p className="flex gap-2 items-center">
          <SpinnerIcon className="h-6 w-6" />
          <span>Adding file...</span>
        </p>
      ) : (
        "Add file"
      )}
    </button>
  );
}