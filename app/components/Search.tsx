import {SearchIcon} from "lucide-react"


const Search = ({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (query: string) => void }) => {
  return (
    <div className="relative w-full border border-lime-500 rounded-xl">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search bookmarks by title or tags..."
        className="border border-lime-500 p-2 rounded-xl w-full pl-10"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
     
    </div>
  )
}

export default Search