import { BookmarkIcon } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <header className="flex justify-between items-center p-7 border-b-2 border-gray-300 w-full">
        <h1 className="text-5xl font-bold flex justify-center items-start font-serif gap-1">
           <BookmarkIcon size={40}  className="rotate-45"/>
           <BookmarkIcon size={40}  className="-rotate-45"/>
           MarkIt.
        </h1>
        <div className="flex gap-4">
            <button className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors duration-300">
                <a href="/login">Login</a>
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors duration-300">
                <a href="/register">Register</a>
            </button>
        </div>
    </header>
  )
}

export default Header