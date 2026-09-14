import { Check, CopyIcon, Link, Loader, Star } from 'lucide-react';
import { useState, useTransition } from 'react'
import {useRouter} from 'next/navigation';
import { deleteBookmark, toggleFavorite } from '../actions';
import {toast} from 'sonner'
const Bookmark = ({ bookmark, copiedId, setCopiedId }: { bookmark: any, copiedId: string | null, setCopiedId: (id: string | null) => void }) => {
      const [isPending, startTransition] = useTransition();
      
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
    const handleDelete = (id: string, title: string) => {
    toast(`Are you sure you want to delete "${title}"?`, {
      action: {
        label: 'Delete',
        onClick: () => {
          startTransition(async () => {
            setDeletingId(id);
            await deleteBookmark(id);
            setDeletingId(null);
            toast.success(`Bookmark "${title}" deleted successfully!`);
            router.refresh();
          });
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {
          setDeletingId(null);
        }
      }
    });
  };
  
const handleToggleFavorite = (id: string) => {
  startTransition(async () => {
    await toggleFavorite(id);
  });
};
console.log('bookmark', bookmark)
console.log(copiedId)
  return (
    <li key={bookmark._id} className="p-4 bg-taupe-600/20 rounded-2xl grid grid-cols-[auto_1fr_auto] gap-5 items-center z-10 justify-between relative group/outer max-sm:gap-3 max-sm:p-2">
    <img src={bookmark.favicon} alt="favicon" className="w-7 h-7" />
    <div className='absolute inset-0 z-20 rounded-2xl opacity-100 group-hover/outer:opacity-0 group-hover/outer:-z-10 transition-opacity duration-500' style={{backgroundImage: bookmark.ogImage ? `url(${bookmark.ogImage})` : '', backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}></div>
    <div className="flex flex-col gap-2 items-start justify-center min-h-25">
      <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:underline flex items-center gap-1 text-xl max-sm:text-base">
        {bookmark.title}
        <Link size={16}  />
      </a>
    <div className="flex gap-2">
      <button className="px-2 py-1 cursor-pointer border border-lime-400 rounded active:scale-95" onClick={() => router.push(`/editBookmark/${bookmark._id}`)}>Edit</button>
      <button className="px-2 py-1 border border-red-400 rounded cursor-pointer active:scale-95" onClick={() => handleDelete(bookmark._id, bookmark.title)} disabled={isPending && deletingId === bookmark._id}>{isPending && deletingId === bookmark._id ? <Loader className="animate-spin" /> : 'Delete'}</button>
      </div> 
      </div>
      <div className='cursor-pointer p-2 rounded-2xl flex items-center gap-5 max-sm:gap-2' ><button className="cursor-pointer group/inner relative" onClick={() => handleToggleFavorite(bookmark._id)}>
        <Star fill={bookmark.isFavorite ? 'orange' : 'none'} size={26}/> <span className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/inner:opacity-100 transition-opacity duration-100"> {bookmark.isFavorite ? 'Remove from favorites' : 'Add to favorites'} </span>
      </button> <button className='cursor-pointer p-2 rounded-2xl relative group/inner' onClick={() => { copyText(bookmark.url); setCopiedId(bookmark._id); }}>{copiedId === bookmark._id ? <Check size={26} className="text-green-500"/> : <CopyIcon size={26}/>} <span className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/inner:opacity-100 transition-opacity duration-100">{copiedId === bookmark._id ? 'Copied!' : 'Copy URL'}</span> </button> </div>
    </li>
  )
}

export default Bookmark