import AddBookmark from "./components/AddBookmark";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ListOfBookmarks from "./components/ListOfBookmarks";

import dbConnect from "@/lib/mongodb";
import Bookmark from "@/models/bookmark";
export default async function Home() {
  await dbConnect();
  const bookmarks = await Bookmark.find({}).sort({ createdAt: -1 }).lean();

  return (
    <>
    <Header />
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
    <Hero />
    <AddBookmark />
    <ListOfBookmarks bookmarks={JSON.parse(JSON.stringify(bookmarks))} />

    </main>
    </>
  );
}
