"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import UserProfile from "./user-profile";

export default function ClientUserSection({ user }: { user: any }) {
  return (
    <>
      {user ? (
        <>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <Button>Dashboard</Button>
          </Link>
          <UserProfile />
        </>
      ) : (
        <>
          <Link
            href="/sign-in"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
          >
            Sign Up
          </Link>
        </>
      )}
    </>
  );
}
