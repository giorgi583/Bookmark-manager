
import { Bookmark } from 'lucide-react'
import {getServerSession} from 'next-auth/next'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Logout from './Logout';

const Header = async () => {
    const session = await getServerSession(authOptions);
  return (
    <header className="p-7 sticky top-0 w-full z-40 max-md:p-4">
        <div className="flex justify-between items-center backdrop-blur-md bg-gray-500/20 p-7 rounded-full max-md:p-4">
            <h1 className="text-5xl font-bold flex justify-center text-lime-500 items-start font-serif gap-1 max-lg:text-4xl max-sm:text-3xl max-[400px]:!text-2xl">
               <div className="flex">
                           <Bookmark className='rotate-45 -mr-2 fill-lime-500 size-10 max-md:size-8 max-md:-mr-1 max-[400px]:!size-6'/><Bookmark className='-rotate-45 size-10 -ml-2 fill-lime-500 max-md:size-8 max-md:-ml-1 max-[400px]:!size-6'/>
                       </div>
               MarkIt.
            </h1>
           {session ? <div className="flex gap-4 items-center max-sm:gap-1">
               <p className="text-gray-400 font-semibold text-xl max-sm:text-base w-fit text-end max-[400px]:!text-sm">Welcome, {session.user?.username}!</p>
               <Logout />
           </div> : <div className="flex gap-4 max-sm:gap-1">
                <button className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors duration-300 max-sm:text-sm max-sm:px-2">
                    <a href="/login">Login</a>
                </button>
                <button className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors duration-300 max-sm:text-sm max-sm:px-2">
                    <a href="/register">Register</a>
                </button>
            </div>}
        </div>
    </header>
  )
}

export default Header