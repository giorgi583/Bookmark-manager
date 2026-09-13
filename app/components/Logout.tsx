"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
    return (
        <button className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors duration-300 max-sm:text-sm max-sm:px-2 cursor-pointer max-[400px]:!text-xs" onClick={() => signOut({callbackUrl: '/'})}>Logout</button>
    );
}