"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import PopupModal from '../components/popup/PopupModal';

interface UserData {
  username: string;
}

interface UserProfileProps {
  params: {
    id: string;
  };
}


const UserProfile: React.FC<UserProfileProps> = ({ params }: UserProfileProps) => {
  const router = useRouter();
  const [data, setData] = useState<string>('nothing');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/user');
      console.log(res.data);
      setData(res.data.data._id);
      setUsername(res.data.data.username);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push('/login');
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-r from-blue-500 to-green-500 text-white">
      <h1 className="text-4xl font-bold mb-4">
        Welcome, {username || 'Guest'}
      </h1>
      <hr className="border-white w-1/4 mb-6" />
      <h2 className="p-3 rounded bg-indigo-600">
        {data === 'nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <hr className="border-white w-1/4 my-6" />
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Refresh User Details
      </button>

      <PopupModal
        isOpen={isLogoutModalOpen}
        onClose={handleCloseLogoutModal}
        onConfirm={handleConfirmLogout}
        message="Are you sure you want to logout?"
      />
    </div>
  );
};

export default UserProfile;
