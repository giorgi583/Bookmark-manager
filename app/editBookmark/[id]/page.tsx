
import EditBookmarkForm from '@/app/components/editBookmarkForm';
import { editBookmark } from '../../actions';
import dbConnect from '@/lib/mongodb';
import Bookmark from '@/models/bookmark';
import { ArrowLeft } from 'lucide-react';
const EditBookmarkPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const editBookmarkWithid = editBookmark.bind(null, id);
  await dbConnect();
  const bookmark = await Bookmark.findById(id).lean();
  if (!bookmark) {
    return <div>Bookmark not found</div>;
  }
  return (
    <div className="p-4 py-20 rounded-2xl min-w-200 max-w-200 mx-auto">
      <h1 className="text-3xl font-bold mb-5">Edit Bookmark</h1>
      <a href="/" className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-full max-w-30 my-5 cursor-pointer">
        <ArrowLeft size={20} /> Back
      </a>
      <p className="text-gray-400">Edit the title and tags of your bookmark below.</p>
      <hr className="my-4 border-gray-600" />
      <EditBookmarkForm id={id} initialTitle={bookmark.title} initialUrl={bookmark.ogImage} initialTags={bookmark.tags} action={editBookmarkWithid} />
    </div>
  )
}

export default EditBookmarkPage