import connectDB from '@/lib/mongodb'
import Bookmark from '@/models/bookmark'

export async function GET() {
  await connectDB()
  const bookmarks = await Bookmark.find({}).sort({ createdAt: -1 }).lean()
  if (!bookmarks) {
    return new Response('No bookmarks found', { status: 404 })
  }
  const json = JSON.stringify(bookmarks, null, 2)
  return new Response(json, {
    headers: {
      'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="bookmarks.json"',
    }
  })
}


