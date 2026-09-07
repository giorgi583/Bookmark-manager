import {SearchIcon} from "lucide-react"

const Search = () => {
  return (
    <div className="relative w-full">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input type="text" placeholder="Search bookmarks by title or tags..." className="border border-gray-300 p-2 rounded-xl w-full pl-10" />
    </div>
  )
}

export default Search