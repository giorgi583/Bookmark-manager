"use server";
import dbConnect from "@/lib/mongodb";
import Bookmark from "@/models/bookmark";
import globe from '../public/globe.svg';
import * as cheerio from "cheerio";
import { revalidatePath } from "next/cache";

export type FormState = { error?: string; success?: boolean } | undefined;
export async function addBookmark(prevState: FormState, formData: FormData): Promise<FormState> {
    const url = formData.get("url") as string;
    await dbConnect();
    let title = url;
    const existingBookmark = await Bookmark.findOne({ url });
    if (existingBookmark) {
       return { error: 'This bookmark already exists' };
    }
    let favicon = globe.src;
    try {const res = await fetch(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
  },
});
    const html = await res.text();
    const $ = cheerio.load(html);
    title = $('title').text() || url;
    if(title === 'Just a moment...') {
      title = url
    }
    if(title.length > 70) {
      title = title.substring(0, 70) + '...';
    }
    const faviconHref =
  $('link[rel="icon"]').attr('href') ||
  $('link[rel="shortcut icon"]').attr('href') ||
  $('link[rel="apple-touch-icon"]').attr('href')
   favicon = faviconHref
  ? new URL(faviconHref, url).toString() 
  : globe.src;
     } 
    catch (error) {
       console.error('Metadata fetch failed for', url, error);
       return { error: 'Could not save that bookmark. Try again.' }
    }
     await Bookmark.create({ url, title, favicon })
  revalidatePath('/')
  return {success: true};
}

export async function deleteBookmark(id: string) {
  await dbConnect();
  await Bookmark.findByIdAndDelete(id);
  revalidatePath('/');
  return {success: true};
}

export async function editBookmark(id: string, prevState: FormState, formData: FormData): Promise<FormState> {
  await dbConnect();
  const title = formData.get("title") as string;
   if (!title.trim()) {
    return { error: 'Title cannot be empty' }
  }
  const tags = formData.get("tags")?.toString().split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) || [];
  await Bookmark.findByIdAndUpdate(id, { title, tags });
  revalidatePath('/');
  return {success: true};
}

export async function toggleFavorite(id: string) {
 try { await dbConnect();
  const bookmark = await Bookmark.findById(id);
  if (bookmark) {
    bookmark.isFavorite = !bookmark.isFavorite;
    await bookmark.save();
  } }
  catch (error) {
    console.error('Metadata fetch failed for', id, error);
  }
  revalidatePath('/');
}