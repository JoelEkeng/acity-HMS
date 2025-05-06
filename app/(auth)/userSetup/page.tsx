/*eslint-disable*/
//@ts-nocheck

'use client';

import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function UserSetupPage() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (user?.gender) setValue('gender', user.gender);
    if (user?.rollNumber) setValue('rollNumber', user.rollNumber);
  }, [user]);

  const onSubmit = async (data: any) => {
    const token = Cookies.get('authToken');
    try {
      const response = await axios.patch(
        'https://acityhost-backend.onrender.com/api/user/profile',
        data,
        { withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, }
    });
      toast.success('Profile updated');
      refreshUser();
      router.push('/dashboard');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to update profile'
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">User Setup</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Gender *</label>
          <select
            disabled={!!user?.gender}
            {...register('gender', { required: 'Gender is required' })}
            className="w-full p-3 rounded border border-zinc-300"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium">Roll Number *</label>
          <input
            disabled={!!user?.rollNumber}
            {...register('rollNumber', { required: 'Enter a valid Roll Number', minLength: 10, maxLength: 10 })}
            type="number"
            placeholder="e.g. 1021100000"
            className="w-full p-3 rounded border border-zinc-300"
          />
          {errors.rollNumber && <p className="text-red-500 text-sm">{errors.rollNumber.message}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium">Parent/Guardian Name</label>
          <input
            {...register('parentName')}
            type="text"
            placeholder="John Doe"
            className="w-full p-3 rounded border border-zinc-300"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Parent/Guardian Phone</label>
          <input
            {...register('parentPhone')}
            type="tel"
            placeholder="024xxxxxxxx"
            className="w-full p-3 rounded border border-zinc-300"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Health Conditions</label>
          <textarea
            {...register('healthConditions')}
            placeholder="E.g. Asthma, Diabetes"
            className="w-full p-3 rounded border border-zinc-300"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Allergies</label>
          <input
            {...register('allergies')}
            type="text"
            placeholder="E.g. Peanuts"
            className="w-full p-3 rounded border border-zinc-300"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Emergency Contact</label>
          <input
            {...register('emergencyContact')}
            type="tel"
            placeholder="Emergency contact number"
            className="w-full p-3 rounded border border-zinc-300"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded font-semibold"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
}
