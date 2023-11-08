"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';


const loginPage = () => {
  const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password:"",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log("login success", response.data);
        toast.success("login Success");
        router.push("/profile");
      } catch (error:any) {
        console.log("login failed", error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    

    useEffect(()=>{
      if (user.email.length > 0 && user.password.length > 0 ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{loading? "processing" : "Login"}</h1>
        <hr />
        <label htmlFor="email">email</label>
        <input className='border border-gray-500 p-2 focus:outline-none'
        id='email'
        type='email'
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder='email'></input>
        
        <label htmlFor="password">password</label>
        <input className='border border-gray-500 p-2 focus:outline-none'
        id='password'
        type='password'
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder='password'></input>

        <button 
        onClick={onLogin}
        className='p-2 m-2 border border-gray-300 rounded-lg 
        mb-4 focus:outline-none focus:border-gray-600  '
        >login</button>
        <Link href="/signup">Not have a account signup here</Link>
    </div>
  )
}


export default loginPage;
