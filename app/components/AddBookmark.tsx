"use client";
import { Loader, TriangleAlertIcon } from "lucide-react";
import { addBookmark } from "../actions"
import { useActionState, useEffect } from 'react'
import { toast } from "sonner";
import {useSession} from 'next-auth/react'
const AddBookmark = () => {
const [state, formAction, isPending] = useActionState(addBookmark, undefined)
const { data: session } = useSession();
  useEffect(() => {
    if (state?.success) {
      toast.success(`Bookmark added successfully!`);
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div className="p-5 mb-10 flex items-center flex-col gap-4 border border-lime-500 rounded bg-gray-800 max-sm:p-3 max-[400px]:!p-1">
      <form className="p-5 flex items-center gap-4 max-sm:p-3 max-sm:gap-2 max-[400px]:!p-1" action={formAction}>
        <label htmlFor="url" className="sr-only">Add Bookmark</label>
          <input className="p-2 border border-lime-500 rounded bg-black" name="url" type="url" placeholder="Paste a URL" required />
          <button className="p-2 rounded bg-lime-500 cursor-pointer w-15 h-10.5 flex items-center justify-center max-sm:p-1 max-sm:w-10 max-sm:text-sm" type="submit" disabled={isPending}>
            {isPending ? <Loader className="animate-spin size-4" /> : 'Save'}
          </button>
        </form>
        {!session && <div className="p-3 bg-gray-400/30 rounded-lg flex items-center gap-2 max-sm:p-2">
            <TriangleAlertIcon size={20} className="text-lime-500" />
            <p className="text-gray-400 max-sm:text-sm">You won't be able to save bookmarks unless you are logged in</p>
          </div>}
    </div>
  )
}

export default AddBookmark