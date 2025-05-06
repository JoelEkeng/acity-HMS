/* eslint-disable */

'use client'

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface UserProfile {
  gender?: string;
  rollNumber?: string;
  parentName?: string;
  parentPhone?: string;
  healthConditions?: string;
  allergies?: string;
  emergencyContact?: string;
}

const UserSettings: React.FC = () => {
  const [initialData, setInitialData] = useState<UserProfile | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<UserProfile>();

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get('https://acityhost-backend.onrender.com/api/users/me'); 
      setInitialData(res.data);
      reset(res.data); 
    };

    fetchUserData();
  }, [reset]);

  const onSubmit = async (data: UserProfile) => {
    try {
      await axios.put('https://acityhost-backend.onrender.com/api/users/me', data); 
      alert('Profile updated successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  if (!initialData) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Gender (readonly if already set) */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">Gender</label>
          <input
            type="text"
            {...register('gender')}
            disabled={!!initialData.gender}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Roll Number (readonly if already set) */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">Roll Number</label>
          <input
            type="text"
            {...register('rollNumber')}
            disabled={!!initialData.rollNumber}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Parent Info */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">Parent Name</label>
          <input
            type="text"
            {...register('parentName')}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600">Parent Phone</label>
          <input
            type="text"
            {...register('parentPhone')}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Medical Info */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">Health Conditions</label>
          <textarea
            {...register('healthConditions')}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600">Allergies</label>
          <textarea
            {...register('allergies')}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Emergency Contact */}
        <div>
          <label className="block text-sm font-semibold text-gray-600">Emergency Contact</label>
          <input
            type="text"
            {...register('emergencyContact')}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;
