"use client";

import { XIcon } from 'lucide-react';
import { useState, useActionState} from 'react';
import { addBookmark } from '../actions';

interface FormProps {
  id: string;
  initialTitle: string;
  initialTags: string[];
  action: (prevState: any, formData: FormData) => Promise<any>;
}
export default function EditBookmarkForm({ id, initialTitle, initialTags, action }: FormProps) {
const [state, formAction, isPending] = useActionState(action, undefined)
  const [tags, setTags] = useState<string[]>(initialTags);

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <form action={formAction} method="POST" className="flex flex-col gap-4">
      <label htmlFor="title" className="font-semibold">Title:</label>
      <input type="text" name="title" defaultValue={initialTitle} className="p-2 border rounded" />
      
      <label htmlFor="tags" className="font-semibold">Tags:</label>

      <input type="hidden" name="tags" value={tags.join(', ')} />
      <input 
        type="text" 
        placeholder="Add tags..." 
        className="p-2 border rounded"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const value = e.currentTarget.value.trim();
            if (value) {{
              setTags([...tags, value]);
              e.currentTarget.value = '';
            }
          }
        }} }
      />

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div className="flex gap-2 items-center rounded-full bg-gray-600 p-2" key={index}>
            {tag} 
            <XIcon className="cursor-pointer w-4 h-4" onClick={() => removeTag(index)} />
          </div>
        ))}
      </div>
      {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state?.success && <p style={{ color: 'green' }}>Bookmark updated successfully!</p>}
      <button type="submit" className="p-2 bg-blue-500 text-white rounded cursor-pointer" disabled={isPending}>{isPending ? 'Saving...' : 'Save'}</button>
    </form>
  );
}