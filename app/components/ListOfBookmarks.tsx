"use client";
import {deleteBookmark, toggleFavorite} from "../actions";
import { useState, useTransition } from 'react';
import Search from "./Search";
import {Link, CopyIcon, Check, Star, Scale, BookmarkIcon} from 'lucide-react'
import {useRouter} from 'next/navigation';
import Bookmark from "./Bookmark";
const ListOfBookmarks = ({ bookmarks }: { bookmarks: any[] }) => {

  const [showedBookmarks, setShowedBookmarks] = useState('All');

  const favorites = bookmarks.filter((b: any) => b.isFavorite);
  
  return (
    <div className="flex flex-col gap-4 border border-gray-300 p-4 rounded-xl min-w-200 relative">
      <BookmarkIcon size={46} className="absolute -top-2 right-5" fill="green" />
      <div className="flex gap-4 items-center">
        <h2 onClick={() => setShowedBookmarks('All')} className={`${showedBookmarks === 'All' ? 'bg-taupe-600/20  border-b-2 border-b-2-gray-300' : ''} p-2 rounded cursor-pointer`}>All Bookmarks</h2>
        <h2 onClick={() => setShowedBookmarks('Favourites')} className={`${showedBookmarks === 'Favourites' ? 'bg-taupe-600/20 border-b-2 border-gray-300' : ''} p-2 rounded cursor-pointer`}>Favourites</h2>
      </div>
      <Search />
      <ul className="flex flex-col gap-4">
  {  showedBookmarks === 'Favourites' ? favorites.length > 0 ? favorites.map((bookmark: any) => <Bookmark bookmark={bookmark} />) : <p className="p-4 bg-taupe-600/20 rounded-2xl flex justify-between items-center gap-4 text-2xl py-20">No bookmarks found!</p> : bookmarks.length > 0 ? bookmarks.map((bookmark: any) => <Bookmark bookmark={bookmark} />) : <div className="p-4 bg-taupe-600/20 rounded-2xl flex justify-between items-center gap-4 py-20 text-2xl">
     No bookmarks to display!</div>}
      </ul>
 </div>
  )
}

export default ListOfBookmarks