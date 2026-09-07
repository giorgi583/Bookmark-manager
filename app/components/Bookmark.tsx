import { Check, CopyIcon, Star } from 'lucide-react';
import React, { useState, useTransition } from 'react'
import {useRouter} from 'next/navigation';
import { deleteBookmark, toggleFavorite } from '../actions';
const Bookmark = ({ bookmark }: { bookmark: any}) => {
      const [isPending, startTransition] = useTransition();
      const [copiedId, setCopiedId] = useState<string | null>(null);
      const [deletingId, setDeletingId] = useState<string | null>(null)
        const router = useRouter();
    const copyText = async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        console.log("Copied!");
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    };
    const handleDelete = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this bookmark?");
    if (!confirmed) return;
    setDeletingId(id);
    startTransition(async () => {
      await deleteBookmark(id);
    });
  };
  
const handleToggleFavorite = (id: string) => {
  startTransition(async () => {
    await toggleFavorite(id);
  });
};
  return (
    <li key={bookmark._id} className="p-4 bg-taupe-600/20 rounded-2xl flex justify-between items-center gap-4">
    <img src={bookmark.favicon} alt="" className="w-7 h-7" />
    <div className="flex flex-col gap-2 items-start">
      <p>{bookmark.title} </p>
      {/* <button className="px-2 py-1 flex items-center gap-2 bg-blue-700 cursor-pointer active:bg-blue-600 active:scale-95"><a href={bookmark.url} target="_blank" rel="noopener noreferrer" >Visit Link </a><Link size={16}/></button> */}
   
    <div className="flex gap-2">
      <button className="px-2 py-1 bg-blue-700 cursor-pointer active:bg-blue-600 active:scale-95" onClick={() => router.push(`/editBookmark/${bookmark._id}`)}>Edit</button>
      <button className="px-2 py-1 bg-red-700 cursor-pointer active:bg-red-600 active:scale-95" onClick={() => handleDelete(bookmark._id)} disabled={isPending && deletingId === bookmark._id}>{isPending && deletingId === bookmark._id ? 'Deleting...' : 'Delete'}</button>
      </div> 
      </div>
      <div className='cursor-pointer p-2 rounded-2xl flex items-center gap-5' ><button className="cursor-pointer" onClick={() => handleToggleFavorite(bookmark._id)}>
        <Star fill={bookmark.isFavorite ? 'orange' : 'none'} size={26}/>
      </button> <button className='cursor-pointer p-2 rounded-2xl' onClick={() => { copyText(bookmark.url); setCopiedId(bookmark._id); }}>{copiedId === bookmark._id ? <Check size={26} className="text-green-500"/> : <CopyIcon size={26}/>}</button> </div>
    </li>
  )
}

export default Bookmark