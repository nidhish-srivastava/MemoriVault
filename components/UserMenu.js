/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];

export default function UserMenu({ session }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  if (!session?.user) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-center relative" ref={menuRef}>
        <button onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
          <img
            src={session.user.image}
            alt="avatar"
            className="w-10 h-10"
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute right-0 top-0 mt-16 bg-white border border-orange-300 z-[10] p-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
            >
              <p className="text-stone-900 text-lg font-bold m-0 leading-none">
                {session.user.name}
              </p>
              <p className="text-stone-700 text-sm m-0">{session.user.email}</p>
              <div className="my-2 w-full border-t border-orange-300" />
              <div className="flex flex-col w-full text-base">
                {navLinks.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-stone-900 hover:bg-orange-100/60 px-2 py-1"
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="my-2 w-full border-t border-orange-300" />
              <button
                className="text-stone-900 hover:bg-orange-100/60 px-2 py-1 w-full text-left"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}