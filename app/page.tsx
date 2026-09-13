import AddBookmark from "./components/AddBookmark";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ListOfBookmarks from "./components/ListOfBookmarks";
import {getServerSession} from 'next-auth/next'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Bookmark from "@/models/bookmark";
import Footer from "./components/Footer";
export default async function Home() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const bookmarks = await Bookmark.find( {userId: session?.user?.id}).sort({ createdAt: -1 }).lean();
console.log(session, bookmarks);
  return (
    <>
    <Header />
    <main className="flex min-h-screen flex-col items-center justify-between p-20 max-md:p-10 max-sm:p-4">
    <Hero />
    <AddBookmark />
    <ListOfBookmarks bookmarks={JSON.parse(JSON.stringify(bookmarks))} />
    </main>
    <Footer/>
    </>
  );
}
