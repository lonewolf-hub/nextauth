"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the correct module
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

const signupPage = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: ""
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error:any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className='border border-gray-500 p-2 focus:outline-none'
        id='username'
        type='text'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='Username'
      />

      <label htmlFor="email">email</label>
      <input
        className='border border-gray-500 p-2 focus:outline-none'
        id='email'
        type='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
      />

      <label htmlFor="password">password</label>
      <input
        className='border border-gray-500 p-2 focus:outline-none'
        id='password'
        type='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
      />

      <button
        onClick={onSignup}
        className='p-2 m-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >
        {buttonDisabled ? "No signup until value is filled" : "You can proceed to signup"}
      </button>
      <Link href="/login">Already signed up? Login here</Link>
    </div>
  )
}

export default signupPage;
