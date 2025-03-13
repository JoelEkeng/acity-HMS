'use client';

import React, { useState, useEffect } from 'react';
import { Label } from '@/components/label';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { createTenant } from '@/api/tenants';
import { getEntities } from '@/api/entities';


// Zod schema for tenant form validation
const TenantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format').optional(),
  phone_number: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
  recommendations: z.string().optional(),
  entity: z.string().min(1, 'Entity is required'),
  status: z.enum(['A','X']),
  attachments: z.array(z.number()).optional(),
});

type TenantFormValues = z.infer<typeof TenantSchema>;

export default function AddTenantForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [entities, setEntities] = useState<any[]>([]);

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TenantFormValues>({
    resolver: zodResolver(TenantSchema),
    reValidateMode: 'onChange',
  });

  // Handle form submission
  const onSubmit = async (data: TenantFormValues) => {
    setServerError(null);

    try {
      // Construct payload based on tenant form data
      const payload = {
        ...data,
        entity: data.entity ? Number(data.entity) : 1,
        status: data.status || 'A', // Default to 'active' if status is not provided
      };

      // Make the API call to create tenant
      const response = await createTenant( payload);
      console.log('Tenant created successfully:', response);
      router.push('/dashboard/tenants'); // Redirect after success
      reset(); // Reset form on success
    } catch (error: any) {
      console.error('Error creating tenant:', error.message);
      setServerError(error?.response?.data?.message || error.message || 'An error occurred');
    }
  };

  useEffect(() => {
    try {
      getEntities().then((data) => {
        setEntities(data);
      });
    } catch (error) {
      console.error('Error fetching entities:', error);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      {/* Tenant Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-lg font-semibold text-gray-700">Tenant Name</Label>
        <Input
          id="name"
          placeholder="E.g., John Doe"
          {...register('name')}
          className={`w-full p-3 border rounded-md shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* Tenant Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-lg font-semibold text-gray-700">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="E.g., johndoe@example.com"
          {...register('email')}
          className={`w-full p-3 border rounded-md shadow-sm ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="phone_number" className="text-lg font-semibold text-gray-700">Phone Number</Label>
        <Input
          id="phone_number"
          placeholder="E.g., 123-456-7890"
          {...register('phone_number')}
          className={`w-full p-3 border rounded-md shadow-sm ${errors.phone_number ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.phone_number && <p className="text-sm text-red-500">{errors.phone_number.message}</p>}
      </div>

      {/* Recommendations */}
      <div className="space-y-2">
        <Label htmlFor="recommendations" className="text-lg font-semibold text-gray-700">Recommendations</Label>
        <textarea
          id="recommendations"
          placeholder="E.g., Calm and obedient"
          {...register('recommendations')}
          className={`w-full p-3 border rounded-md shadow-sm ${errors.recommendations ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.recommendations && <p className="text-sm text-red-500">{errors.recommendations.message}</p>}
      </div>

      {/* Entity */}
      <div className="space-y-2">
        <Label htmlFor="entity" className="text-lg font-semibold text-gray-700">Entity</Label>
        <select
          id="entity"
          {...register('entity')}
          className={`w-full p-3 border rounded-md shadow-sm ${errors.entity ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
        <option>Select Entity</option>
        {entities.map((entity) => (
          <option key={entity.id} value={entity.id}>
            {entity.name}
          </option>
        ))}
        </select>
        {errors.entity && <p className="text-sm text-red-500">{errors.entity.message}</p>}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status" className="text-lg font-semibold text-gray-700">Status</Label>
        <select
          id="status"
          {...register('status')}
          className={`w-full p-3 border rounded-md shadow-sm ${errors.status ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="">Select Status</option>
          <option value="A">A</option>
          <option value="X">X</option>
        </select>
        {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full mt-4 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Add Tenant
      </Button>

      {/* Error Message */}
      {serverError && <p className="text-sm text-red-500 mt-2">{serverError}</p>}
    </form>
  );
}
