/*eslint-disable */

'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface UserProfile {
  fullName?: string;
  email?: string;
  gender?: string;
  rollNumber?: string;
  parentName?: string;
  parentPhone?: string;
  healthConditions?: string;
  allergies?: string;
  emergencyContact?: string;
  roomId?: string;
}

const fields: (keyof UserProfile)[] = [
  'fullName',
  'email',
  'gender',
  'rollNumber',
  'roomId',
  'parentName',
  'parentPhone',
  'healthConditions',
  'allergies',
  'emergencyContact',
];

const fieldLabels: Record<keyof UserProfile, string> = {
  fullName: 'Full Name',
  email: 'Email Address',
  gender: 'Gender',
  rollNumber: 'Roll Number',
  roomId: 'Current Occupant',
  parentName: 'Parent Name',
  parentPhone: 'Parent Phone',
  healthConditions: 'Health Conditions',
  allergies: 'Allergies',
  emergencyContact: 'Emergency Contact',
};

const fieldPlaceholders: Record<keyof UserProfile, string> = {
  fullName: 'Enter full name',
  email: 'Enter email address',
  gender: 'Select gender',
  rollNumber: 'Enter roll number',
  roomId: 'Enter room ID',
  parentName: 'Enter parent name',
  parentPhone: 'Enter parent phone',
  healthConditions: 'e.g., Asthma, Diabetes',
  allergies: 'e.g., Peanuts, Milk',
  emergencyContact: '233201964305',
};

const UserSettings: React.FC = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState<Partial<Record<keyof UserProfile, boolean>>>({});
  const [initialData, setInitialData] = useState<UserProfile | null>(null);
  const { register, handleSubmit, reset } = useForm<UserProfile>();

  useEffect(() => {
    if (user) {
      setInitialData(user);
      reset(user);
    }
  }, [user, reset]);

  const handleFieldClick = (field: keyof UserProfile) => {
    if (['gender', 'rollNumber', 'email'].includes(field) && initialData?.[field]) return;
    setEditMode(prev => ({ ...prev, [field]: true }));
  };

  const onSubmit = async (data: UserProfile) => {
    try {
      await axios.put('https://acityhost-backend.onrender.com/api/users/me', data);
      alert('Profile updated successfully!');
      setEditMode({});
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  if (!initialData) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 rounded-2xl shadow-xl bg-white border border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">User Settings</h2>
        <p className="text-gray-600 mt-1">Click on any field to edit your information</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(field => (
          <motion.div
            key={field}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.03 * fields.indexOf(field) }}
            className="group"
          >
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {fieldLabels[field]}
            </label>

            {editMode[field] ? (
              <input
                type="text"
                {...register(field)}
                autoFocus
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            ) : (
              <div
                onClick={() => handleFieldClick(field)}
                className={cn(
                  'px-4 py-2 border rounded-lg transition bg-white hover:bg-blue-50 cursor-pointer',
                  ['gender', 'rollNumber', 'email'].includes(field) && initialData[field]
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : ''
                )}
              >
                {initialData[field] || (
                  <span className="text-gray-400 italic">{fieldPlaceholders[field]}</span>
                )}
              </div>
            )}
          </motion.div>
        ))}

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;
