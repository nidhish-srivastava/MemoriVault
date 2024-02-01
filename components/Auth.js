"use client";

import { signIn, signOut } from "next-auth/react";

export default function SignIn({ label }) {
  return (
    <button
      className="px-3 py-2 text-lg bg-orange-700 text-stone-50 max-w-max"
      onClick={() => {
        signIn("google", {
          callbackUrl: "/dashboard",
        });
      }}
    >
      {label || "Sign in"}
    </button>
  );
}

export function SignOut({ label }) {
  return (
    <button
      className="px-3 py-2 text-lg bg-orange-50 text-stone-50 max-w-max"
      onClick={() => signOut()}
    >
      {label || "Sign out"}
    </button>
  );
}