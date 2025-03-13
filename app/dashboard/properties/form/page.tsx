'use client';

import React, { useState, useEffect } from 'react';
import { Label } from '@/components/label';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropertySchema } from '@/lib/definitions';
import { z } from 'zod';
import { createProperty } from '@/api/properties';
import { getEntities } from '@/api/entities';
import { getPropertyTypes } from '@/api/property-types';

type PropertyFormValues = z.infer<typeof PropertySchema>;

export default function AddPropertyForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [entities, setEntities] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  
  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(PropertySchema),
    reValidateMode: 'onChange',
  });

  // Handle form submission
  const onSubmit = async (data: PropertyFormValues) => {
    setServerError(null);

    try {
      const payload = {
        ...data,
        year_completed: data.year_completed ? Number(data.year_completed) : 2022,
        entity: data.entity ? Number(data.entity) : 1,
        property_type: data.property_type ? Number(data.property_type) : 1,
        property_value: data.property_value ? String(data.property_value) : '1',
      };

      const response = await createProperty(payload);
      console.log('Property created successfully:', response);
      router.push('/dashboard/properties'); // Redirect after success
      reset(); // Reset form on success
    } catch (error: any) {
      console.error('Error creating property:', error.message);
      setServerError(
        error?.response?.data?.message || error.message || 'An error occurred'
      );
    }
  };

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await getEntities(); // Ensure this API call works correctly
        setEntities(response || []); // Set fetched data or default to an empty array
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };

    fetchEntities();
  }, []);

  useEffect(() => {
    const fetchGetPropertyTypes = async () => {
    try{
    const response = await getPropertyTypes();
    setPropertyTypes(response || []);;
    } catch(error){
      console.error("Error fetching property types", error)
    }
  };

    fetchGetPropertyTypes();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
    {/* Property Name */}
    <div className='grid grid-cols-2 gap-4'>
    <div className="space-y-2">
      <Label htmlFor="name" className="text-lg font-semibold text-gray-700">Property Name</Label>
      <Input
        id="name"
        placeholder="E.g., Sunny Apartments"
        {...register('name')}
        className={`w-full p-3 border rounded-md shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
    </div>
  
    {/* Address */}
    <div className="space-y-2">
      <Label htmlFor="address" className="text-lg font-semibold text-gray-700">Address</Label>
      <Input
        id="address"
        placeholder="123 Main St"
        {...register('address')}
        className={`w-full p-3 border rounded-md shadow-sm ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
    </div>
  
    {/* City */}
    <div className="space-y-2">
      <Label htmlFor="city" className="text-lg font-semibold text-gray-700">City</Label>
      <Input
        id="city"
        placeholder="E.g., Accra"
        {...register('city')}
        className={`w-full p-3 border rounded-md shadow-sm ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
    </div>
  
    {/* Region */}
    <div className="space-y-2">
      <Label htmlFor="region" className="text-lg font-semibold text-gray-700">Region</Label>
      <select
        id="region"
        {...register('region')}
        className={`w-full p-3 border rounded-md shadow-sm ${errors.region ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        <option value="">Select Region</option>
        <option value="ASHANTI">ASHANTI</option>
        <option value="BRONG_AHAFO">BRONG_AHAFO</option>
        <option value="CENTRAL">CENTRAL</option>
        <option value="EASTERN">EASTERN</option>
        <option value="GREATER_ACCRA">GREATER_ACCRA</option>
        <option value="NORTHERN">NORTHERN</option>
        <option value="UPPER_EAST">UPPER_EAST</option>
        <option value="UPPER_WEST">UPPER_WEST</option>
        <option value="VOLTA">VOLTA</option>
        <option value="WESTERN">WESTERN</option>
        <option value="SAVANNAH">SAVANNAH</option>
        <option value="BONO_EAST">BONO_EAST</option>
        <option value="OTI">OTI</option>
        <option value="AHAFO">AHAFO</option>
        <option value="WESTERN_NORTH">WESTERN_NORTH</option>
        <option value="NORTH_EAST">NORTH_EAST</option>
          </select>
      {errors.region && <p className="text-sm text-red-500">{errors.region.message}</p>}
    </div>
  
    {/* Ghana Post GPS */}
    <div className="space-y-2">
      <Label htmlFor="ghana_post_gps" className="text-lg font-semibold text-gray-700">Ghana Post GPS</Label>
      <Input
        id="ghana_post_gps"
        placeholder="E.g., GA-123-4567"
        {...register('ghana_post_gps')}
        className={`w-full p-3 border rounded-md shadow-sm ${errors.ghana_post_gps ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {errors.ghana_post_gps && <p className="text-sm text-red-500">{errors.ghana_post_gps.message}</p>}
    </div>
  
    {/* Property Value */}
    <div className="space-y-2">
      <Label htmlFor="property_value" className="text-lg font-semibold text-gray-700">Property Value</Label>
      <Input
        id="property_value"
        placeholder="E.g., 500,000"
        type="number"
        {...register('property_value')}
        className={`w-full p-3 border rounded-md shadow-sm ${errors.property_value ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {errors.property_value && <p className="text-sm text-red-500">{errors.property_value.message}</p>}
    </div>
  
    {/* Usage */}
    <div className="space-y-2">
      <Label htmlFor="usage" className="text-lg font-semibold text-gray-700">Usage</Label>
      <select
        id="usage"
        {...register('usage')}
        className={`w-full p-3 border rounded-md shadow-sm ${errors.usage ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        <option value="">Select Usage</option>
          <option value="RESIDENTIAL">RESIDENTIAL</option>
          <option value="COMMERCIAL">COMMERCIAL</option>
          <option value="MIXED">MIXED</option>
          <option value="OTHER">OTHER</option>
      </select>
      {errors.usage && <p className="text-sm text-red-500">{errors.usage.message}</p>}
    </div>
  
    {/* Property Type */}
    <div className="space-y-2">
      <Label htmlFor="property_type" className="text-lg font-semibold text-gray-700">Property Type</Label>
      <select
        id="property_type"
        {...register('property_type')}
        className={`w-full p-3 border rounded-md shadow-sm ${errors.property_type ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        <option value="">Select Property Type</option>
        {propertyTypes.map((propertyType: { id: number; name: string }) => (
          <option key={propertyType.id} value={propertyType.id}>{propertyType.name}</option>
        ))}
      </select>
      {errors.property_type && <p className="text-sm text-red-500">{errors.property_type.message}</p>}
    </div>
  
  {/* Entity Dropdown */}
  <div className="space-y-2">
        <Label htmlFor="entity" className="text-lg font-semibold text-gray-700">
          Entity
        </Label>
        <select
          id="entity"
          {...register('entity')}
          className={`w-full p-3 border rounded-md shadow-sm ${
            errors.entity ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="">Select Entity</option>
          {entities.map((entity: { id: number; name: string }) => (
            <option key={entity.id} value={entity.id}>
              {entity.name}
            </option>
          ))}
        </select>
        {errors.entity && (
          <p className="text-sm text-red-500">{errors.entity.message}</p>
        )}
      </div>

  
    {/* Year Completed */}
    <div className="space-y-2">
      <Label htmlFor="year_completed" className="text-lg font-semibold text-gray-700">Year Completed</Label>
      <Input
        id="year_completed"
        placeholder="E.g., 2023"
        {...register('year_completed')}
        className={`w-full p-3 border rounded-md shadow-sm ${errors.year_completed ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {errors.year_completed && <p className="text-sm text-red-500">{errors.year_completed.message}</p>}
    </div>
  
    {/* Leasehold Due Date */}
    <div className="space-y-2">
      <Label htmlFor="leasehold_due_date" className="text-lg font-semibold text-gray-700">Leasehold Due Date</Label>
      <Input
        id="leasehold_due_date"
        type="date"
        {...register('leasehold_due_date')}
        className={`w-full p-3 border rounded-md shadow-sm ${errors.leasehold_due_date ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {errors.leasehold_due_date && <p className="text-sm text-red-500">{errors.leasehold_due_date.message}</p>}
    </div>
  
    {/* Description */}
    <div className="space-y-2">
      <Label htmlFor="description" className="text-lg font-semibold text-gray-700">Description</Label>
      <textarea
        id="description"
        placeholder="Property details..."
        {...register('description')}
        className={`w-full p-3 border rounded-md shadow-sm ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
    </div>
  
    {/* Recommendations */}
    <div className="space-y-2">
      <Label htmlFor="recommendations" className="text-lg font-semibold text-gray-700">Recommendations</Label>
      <textarea
        id="recommendations"
        placeholder="E.g., Renovate kitchen"
        {...register('recommendations')}
        className={`w-full p-3 border rounded-md shadow-sm ${errors.recommendations ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {errors.recommendations && <p className="text-sm text-red-500">{errors.recommendations.message}</p>}
    </div>
    </div>
  
    {/* Submit Button */}
    <Button type="submit" className="w-full mt-4 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12">
      Add Property
    </Button>
  
    {/* Error Message */}
    {serverError && <p className="text-sm text-red-500 mt-2">{serverError}</p>}
  </form>
  
  );
}
