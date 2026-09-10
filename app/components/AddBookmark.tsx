"use client";
import { addBookmark } from "../actions"
import { useActionState } from 'react'
import {toast} from 'react-hot-toast'
const AddBookmark = () => {
const [state, formAction, isPending] = useActionState(addBookmark, undefined)
  return (
    <form className="p-5 mb-10" action={formAction}>
        <input className="p-2 border border-gray-300 rounded" name="url" type="url" placeholder="Paste a URL" required />
        <button className="p-2 border border-gray-300 rounded cursor-pointer" type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save'}
        </button>
        {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
      </form>
  )
}

export default AddBookmark