"use client";
import { ArrowBigLeft } from 'lucide-react'
import {signIn} from 'next-auth/react'
import {useState} from 'react'
import { toast } from 'sonner';
const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (formData: FormData) => {
    const result = await signIn('credentials', { email: formData.get('email'), password: formData.get('password'), redirect: false });
    if (result?.error) {
      setError(result.error);
    }
    else {
      setError(null);
      window.location.href = '/';
      toast.success('Login successful!');
    }
  }
  return (
    <>
    <a href="/" className="flex items-center gap-2 px-4 py-2 mx-5 bg-gray-700 text-white rounded-full max-w-30 my-5 cursor-pointer fixed top-5">
      <ArrowBigLeft size={20} /> Back
      </a>
    <div className="flex flex-col items-center justify-center gap-4  p-4 border-2 border-gray-300 rounded-xl min-w-100 max-w-150 mx-auto my-auto">
      <h1 className="text-3xl font-bold mb-5">Login</h1>
      <form action={handleSubmit} className="flex flex-col gap-4 w-full">
        <label htmlFor="email" className="font-semibold">Email:</label>
        <input type="email" name="email" placeholder="Enter your email" className="p-2 border rounded" />
        <label htmlFor="password" className="font-semibold">Password:</label>
        <input type="password" name="password" placeholder="Enter your password" className="p-2 border rounded" />
        <a href="/register" className="text-sm text-lime-500 hover:underline">Don't have an account? Register here</a>
        <button type="submit" className="px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600 cursor-pointer">Login</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
    </>
  )
}

export default LoginPage