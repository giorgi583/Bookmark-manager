import { BookmarkIcon } from 'lucide-react'


const Header = () => {
  return (
    <header className="p-7 sticky top-0 w-full z-40">
        <div className="flex justify-between items-center backdrop-blur-md bg-gray-500/20 p-7 rounded-full">
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
        </div>
    </header>
  )
}

export default Header