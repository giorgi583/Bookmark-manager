"use client";
import { Loader } from "lucide-react";
import { addBookmark } from "../actions"
import { useActionState, useEffect } from 'react'
import { toast } from "sonner";
const AddBookmark = () => {
const [state, formAction, isPending] = useActionState(addBookmark, undefined)

  useEffect(() => {
    if (state?.success) {
      toast.success(`Bookmark added successfully!`);
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form className="p-5 mb-10 flex items-center gap-4" action={formAction}>
        <input className="p-2 border border-gray-300 rounded" name="url" type="url" placeholder="Paste a URL" required />
        <button className="p-2 border border-gray-300 rounded cursor-pointer w-15 h-10.5 felx items-center justify-center" type="submit" disabled={isPending}>
          {isPending ? <Loader className="animate-spin size-4" /> : 'Save'}
        </button>
      </form>
  )
}

export default AddBookmark