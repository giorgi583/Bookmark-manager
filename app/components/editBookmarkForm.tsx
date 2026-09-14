"use client";

import { Loader, XIcon } from 'lucide-react';
import { useState, useActionState, useEffect} from 'react';
import { toast } from 'sonner';


interface FormProps {
  id: string;
  initialTitle: string;
  initialUrl: string;
  initialTags: string[];
  action: (prevState: any, formData: FormData) => Promise<any>;
}
export default function EditBookmarkForm({ id, initialTitle, initialUrl, initialTags, action }: FormProps) {
const [state, formAction, isPending] = useActionState(action, undefined)
  const [tags, setTags] = useState<string[]>(initialTags);
useEffect(() => {
    if (state?.success) {
      toast.success(`Bookmark updated successfully!`);
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <form action={formAction} className="flex flex-col gap-7">
      <label htmlFor="title" className="font-semibold">Title:</label>
      <input type="text" placeholder="Add a title..." id="title" name="title" defaultValue={initialTitle} className="p-2 border rounded" />
      <label htmlFor="url" className="font-semibold">Thumbnail:</label>
      <input type="text" id="url" name="url" defaultValue={initialUrl} placeholder="Paste an image address..." className="p-2 border rounded" />
      <label htmlFor="tags" className="font-semibold">Tags:</label>

      <input type="hidden" id="tags" name="tags" value={tags.join(', ')} />
      <input 
        type="text" 
        placeholder="Add tags..." 
        className="p-2 border rounded"
        id="tag"
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
      <button type="submit" className="p-2 bg-lime-500 text-white font-bold rounded cursor-pointer flex items-center justify-center gap-2" disabled={isPending}>Save{isPending ? <Loader className="animate-spin size-5" /> : ''}</button>
    </form>
  );
}