"use client";
import { useState } from 'react';
import Search from "./Search";
import { BookmarkIcon, BookmarkOff, Download} from 'lucide-react'
import Bookmark from "./Bookmark";
import { deleteAllBookmarks } from '../actions';
const ListOfBookmarks = ({ bookmarks }: { bookmarks: any[] }) => {
const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showedBookmarks, setShowedBookmarks] = useState<string>('All');
  const [showMore, setShowMore] = useState<boolean>(false);
const [searchQuery, setSearchQuery] = useState<string>('');
  const favorites = bookmarks.filter((b: any) => b.isFavorite);
  
  return (
    <div className="flex flex-col gap-4 border-2 border-lime-500 p-4 shadow-md shadow-lime-300 bg-gray-800 rounded-xl min-w-100 max-w-160 max-sm:min-w-50 relative">
      <BookmarkIcon size={46} className="absolute -top-2 right-5 text-white" fill='#84CC16'  />
      <div className="flex gap-4 items-center my-3 max-md:gap-2 max-sm:flex-col max-sm:items-start">
        <div className="flex gap-2">
          <h2 onClick={() => setShowedBookmarks('All')} className={`${showedBookmarks === 'All' ? 'bg-taupe-600/20  border-b-2 border-b-2-gray-300' : ''} p-2 rounded cursor-pointer`}>All Bookmarks</h2>
          <h2 onClick={() => setShowedBookmarks('Favourites')} className={`${showedBookmarks === 'Favourites' ? 'bg-taupe-600/20 border-b-2 border-gray-300' : ''} p-2 rounded cursor-pointer`}>Favourites</h2>
        </div>
      <div className="flex gap-2">
        <button className="p-2 border border-gray-300 rounded cursor-pointer bg-lime-500 font-semibold flex items-center gap-2 hover:bg-lime-600 active:scale-98 transition-transform duration-100" onClick={deleteAllBookmarks}>Clear All</button>
        <a download="bookmarks.json" href="/api/export" className="p-2 border border-lime-500 rounded cursor-pointer flex items-center gap-2 hover:bg-gray-700/20 active:scale-98 transition-transform duration-100">
          Download Bookmarks <Download size={20} className="inline-block ml-1" />
        </a>
      </div>
      </div>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ul className="flex flex-col gap-4">
  { showedBookmarks === 'Favourites' ? favorites.length > 0 ? favorites.filter((bookmark: any) => bookmark.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) || bookmark.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase().trim()))).map((bookmark: any) =>
  { 
    if(favorites.length > 5 && !showMore && !searchQuery) {
      if (favorites.indexOf(bookmark) < 5) {
        return <Bookmark key={bookmark._id} bookmark={bookmark} copiedId={copiedId} setCopiedId={setCopiedId} />
      }
      else return null;
    }
    return <Bookmark key={bookmark._id} bookmark={bookmark} copiedId={copiedId} setCopiedId={setCopiedId} />}) 
  : <p className="p-4 bg-taupe-600/20 rounded-2xl flex justify-center items-center gap-4 text-2xl py-20">No Favourites found! <BookmarkOff size={40} /></p> 
  : bookmarks.length > 0 ? bookmarks.filter((bookmark: any) => {return bookmark.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) || bookmark.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase().trim()))}).map((bookmark: any) => 
 {
  if(bookmarks.length > 5 && !showMore && !searchQuery) {
      if (bookmarks.indexOf(bookmark) < 5) {
        return <Bookmark key={bookmark._id} bookmark={bookmark} copiedId={copiedId} setCopiedId={setCopiedId} />
      }
      else return null;
    }
  return <Bookmark key={bookmark._id} bookmark={bookmark} copiedId={copiedId} setCopiedId={setCopiedId} />}) 
  : <div className="p-4 bg-taupe-600/20 rounded-2xl flex justify-center items-center gap-4 py-20 text-2xl">
     No bookmarks to display! <BookmarkOff size={40} /></div> }
      </ul>
      { (bookmarks.length > 5 || favorites.length > 5) && <button className="p-2 border border-gray-300 rounded cursor-pointer" onClick={() => setShowMore(!showMore)}>{showMore ? 'Show Less' : 'Show More'}</button> }
 </div>
  )
}

export default ListOfBookmarks