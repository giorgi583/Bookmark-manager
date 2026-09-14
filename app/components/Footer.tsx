import { Bookmark } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className="mt-10 p-10 bg-gray-800 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-5 flex items-center gap-1 text-lime-500 font-serif"><div className="flex">
            <Bookmark className='rotate-45 -mr-1 fill-lime-500'/><Bookmark className='-rotate-45 -ml-1 fill-lime-500'/>
        </div> MarkIt.</h1>
        <p className="text-gray-400 text-center">MarkIt is a simple and user-friendly bookmark manager that allows you to create and manage your bookmarks.</p>
        <p className="text-gray-400 text-center">Version 1.0.0</p>
        <hr className="my-4 text-gray-500 w-full"></hr>
        <p className="text-gray-400 text-center mt-5">Copyright &copy; 2026 MarkIt. All rights reserved.</p>
    </div>
  )
}

export default Footer