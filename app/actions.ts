"use server";
import dbConnect from "@/lib/mongodb";
import Bookmark from "@/models/bookmark";
import User from "@/models/users";
import globe from '../public/globe.svg';
import * as cheerio from "cheerio";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { redirect } from "next/dist/server/api-utils";

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
    let ogImage: string | null = null;
    try {const res = await fetch(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
  },
});
    const html = await res.text();
    const $ = cheerio.load(html);
    const ogImageRaw =
  $('meta[property="og:image"]').attr('content') ||
  $('meta[name="twitter:image"]').attr('content');
    if (ogImageRaw) {
      ogImage = new URL(ogImageRaw, url).toString();
    }
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
     await Bookmark.create({ url, title, favicon, ogImage });
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
  const ogImage = formData.get("url") as string;
  const tags = formData.get("tags")?.toString().split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) || [];
  await Bookmark.findByIdAndUpdate(id, { title, ogImage, tags });
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

export async function deleteAllBookmarks() {
  await dbConnect();
  await Bookmark.deleteMany({});
  revalidatePath('/');
  return {success: true};
}
function validatePass(password: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
  return regex.test(password);
}
export async function register ( prevState: FormState,  formData: FormData): Promise<FormState> {
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  if(password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }
  if(!validatePass(password)) {
    return { error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.' }
  }
  try { await dbConnect();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { error: 'User already exists' };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name: username, email, password: hashedPassword });
  return {success: true}; 
}
  catch (error) {
    console.error('User creation failed', error);
    return { error: 'Could not Register. Try again.' }
  }
}