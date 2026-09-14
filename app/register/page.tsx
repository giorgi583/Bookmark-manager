"use client";
import { ArrowBigLeft, Eye, Loader } from 'lucide-react'
import React, { useActionState, useEffect } from 'react'
import {register} from '../actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
const RegisterPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const router = useRouter();
  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const [state, formAction, isPending] = useActionState(register, undefined)
  useEffect(() => {
    if (state?.success) {
      toast.success(`Account created successfully!`);
      setPassword('');
      router.push('/login');
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);
  return (
    <>
      <a href="/" className="flex items-center gap-2 px-4 py-2 mx-5 bg-gray-700 text-white rounded-full max-w-30 fixed top-5 cursor-pointer">
      <ArrowBigLeft size={20} /> Back
      </a>
      <div className="flex flex-col items-center justify-center gap-4  p-4 border-2 shadow-lime-300 shadow-md border-lime-500 bg-gray-800 rounded-xl min-w-100 max-w-150 mx-auto my-auto max-sm:min-w-60 max-sm:mt-25">
      <h1 className="text-3xl font-bold mb-5">Register</h1>
      <form action={formAction} className="flex flex-col gap-4 w-full">
        <label htmlFor="username" className="font-semibold">Username:</label>
        <input required type="text" id="username" name="username" placeholder="Enter your username" className="p-2 border rounded" />
        <label htmlFor="email" className="font-semibold">Email:</label>
        <input required type="email" id="email" name="email" placeholder="Enter your email" className="p-2 border rounded" />
        <label htmlFor="password" className="font-semibold">Password:</label>
        <div className="relative w-full"><input required type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e)=> setPassword(e.target.value)} name="password" placeholder="Enter your password" className="p-2 border rounded w-full" />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}><Eye /></button>
        </div>
        <label htmlFor="confirmPassword" className="font-semibold">Confirm Password:</label>
        <div className="relative w-full"><input required id="confirmPassword" type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm your password" className="p-2 border rounded w-full" />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}><Eye /></button>
        </div>
         {password && <ul className="flex flex-col gap-2 bg-gray-600/20 p-2 rounded">
          <li className={`${/[A-Z]/.test(password) ? 'opacity-100' : 'opacity-50'}`}>{/[A-Z]/.test(password) ? <span className="text-lime-500">✓</span> : <span className="text-red-500">✗</span>} At least one uppercase letter</li>
          <li className={`${/[a-z]/.test(password) ? 'opacity-100' : 'opacity-50'}`}>{/[a-z]/.test(password) ? <span className="text-lime-500">✓</span> : <span className="text-red-500">✗</span>} At least one lowercase letter</li>
          <li className={`${/[0-9]/.test(password) ? 'opacity-100' : 'opacity-50'}`}>{/[0-9]/.test(password) ? <span className="text-lime-500">✓</span> : <span className="text-red-500">✗</span>} At least one number</li>
          <li className={`${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 'opacity-100' : 'opacity-50'}`}>{/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? <span className="text-lime-500">✓</span> : <span className="text-red-500">✗</span>} At least one special character</li>
           <li className={`${password.length >= 8 ? 'opacity-100' : 'opacity-50'}`}>{password.length >= 8 ? <span className="text-lime-500">✓</span> : <span className="text-red-500">✗</span>} At least 8 characters</li>
         </ul>}
        <a href="/login" className="text-sm text-lime-500 hover:underline">Already have an account? Login here</a>
        <button type="submit" className="px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600 cursor-pointer flex items-center justify-center gap-2">Register {isPending && <Loader className="animate-spin" />}</button>
      </form>
    </div>
    </>
  )
}

export default RegisterPage