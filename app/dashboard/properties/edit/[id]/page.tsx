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
import { getProperty, updateProperty } from '@/api/properties';
import { getEntities } from '@/api/entities';

type PropertyFormValues = z.infer<typeof PropertySchema>;

export default function EditPropertyForm({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [property, setProperty] = useState<PropertyFormValues | null>(null);
  const [entities, setEntities] = useState<{ id: number; name: string }[]>([]);
  const { id } = params;

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(PropertySchema),
    defaultValues: {}, // Will be dynamically updated later
  });

  // Fetch property details for editing
  useEffect(() => {
    async function fetchProperty() {
      try {
        const data = await getProperty(Number(id));
        setProperty(data);
        reset(data); // Populate form with current property details
      } catch (error) {
        console.error('Failed to fetch property:', error);
      }
    }
    fetchProperty();
  }, [id, reset]);

  // Fetch entity details
  useEffect(() => {
    async function fetchEntities() {
      try {
        const entitiesData = await getEntities();
        setEntities(entitiesData);
      } catch (error) {
        console.error('Failed to fetch entities:', error);
      }
    }
    fetchEntities();
  }, []);

  // Handle form submission
  const onSubmit = async (data: PropertyFormValues) => {
    setServerError(null);

    try {
      const payload = {
        ...data,
        year_completed: Number(data.year_completed) || new Date().getFullYear(),
        entity: Number(data.entity) || 1,
        property_type: Number(data.property_type) || 1,
        property_value: data.property_value || '0',
      };

      await updateProperty(Number(id), payload);
      alert('Property updated successfully!');
      router.push('/dashboard/properties'); // Redirect after success
    } catch (error: any) {
      console.error('Error updating property:', error.message);
      setServerError(
        error?.response?.data?.message || error.message || 'An error occurred'
      );
    }
  };

  if (!property) return <p>Loading property details...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6"
    >
      <h1 className="text-xl font-bold">Update Property {id}</h1>

      {/* Property Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-lg font-semibold text-gray-700">
          Property Name
        </Label>
        <Input
          id="name"
          placeholder="E.g., Sunny Apartments"
          {...register('name')}
          className={`w-full p-3 border rounded-md shadow-sm ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address" className="text-lg font-semibold text-gray-700">
          Address
        </Label>
        <Input
          id="address"
          placeholder="123 Main St"
          {...register('address')}
          className={`w-full p-3 border rounded-md shadow-sm ${
            errors.address ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
            defaultValue={property.city}
            className={`w-full p-3 border rounded-md shadow-sm ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
        </div>

            {/* Region */}
      <div className="space-y-2">
        <Label htmlFor="region" className="text-lg font-semibold text-gray-700">
          Region
        </Label>
        <select
          id="region"
          {...register('region')}
          className={`w-full p-3 border rounded-md shadow-sm ${
            errors.region ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="">Select Region</option>
          {[
            'ASHANTI',
            'BRONG_AHAFO',
            'CENTRAL',
            'EASTERN',
            'GREATER_ACCRA',
            'NORTHERN',
            'UPPER_EAST',
            'UPPER_WEST',
            'VOLTA',
            'WESTERN',
          ].map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
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
          defaultValue={property.ghana_post_gps}
          className={`w-full p-3 border rounded-md shadow-sm ${errors.ghana_post_gps ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.ghana_post_gps && <p className="text-sm text-red-500">{errors.ghana_post_gps.message}</p>}
      </div>
    
         {/* Property Value */}
         <div className="space-y-2">
        <Label htmlFor="property_value" className="text-lg font-semibold text-gray-700">
          Property Value
        </Label>
        <Input
          id="property_value"
          placeholder="E.g., 500000"
          type="number"
          {...register('property_value')}
          className={`w-full p-3 border rounded-md shadow-sm ${
            errors.property_value ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.property_value && (
          <p className="text-sm text-red-500">{errors.property_value.message}</p>
        )}
      </div>
    
      {/* Usage */}
      <div className="space-y-2">
        <Label htmlFor="usage" className="text-lg font-semibold text-gray-700">Usage</Label>
        <select
          id="usage"
          {...register('usage')}
          defaultValue={property.usage}
          className={`w-full p-3 border rounded-md shadow-sm ${errors.usage ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="">Select Usage</option>
            <option value="RESIDENTIAL">RESIDENTIAL</option>
            <option value="COMMERCIAL">COMMERCIAL</option>
            <option value="MIXED">MIXED</option>
            <option value="OTHERS">OTHERS</option>
        </select>
        {errors.usage && <p className="text-sm text-red-500">{errors.usage.message}</p>}
      </div>
    
      {/* Property Type */}
      <div className="space-y-2">
        <Label htmlFor="property_type" className="text-lg font-semibold text-gray-700">Property Type</Label>
        <Input
          id="property_type"
          placeholder="E.g., 1"
          type="number"
          {...register('property_type')}
          defaultValue={property.property_type}
          className={`w-full p-3 border rounded-md shadow-sm ${errors.property_type ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.property_type && <p className="text-sm text-red-500">{errors.property_type.message}</p>}
      </div>
    
       {/* Entity */}
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
          {entities.map((entity) => (
            <option key={entity.id} value={entity.id}>
              {entity.name}
            </option>
          ))}
        </select>
        {errors.entity && <p className="text-sm text-red-500">{errors.entity.message}</p>}
      </div>
    
      {/* Year Completed */}
      <div className="space-y-2">
        <Label htmlFor="year_completed" className="text-lg font-semibold text-gray-700">Year Completed</Label>
        <Input
          id="year_completed"
          type="number"
          placeholder="E.g., 2023"
          {...register('year_completed')}
          defaultValue={property.year_completed}
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
          defaultValue={property.leasehold_due_date}
          className={`w-full p-3 border rounded-md shadow-sm ${errors.leasehold_due_date ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.leasehold_due_date && <p className="text-sm text-red-500">{errors.leasehold_due_date.message}</p>}
      </div>
    
      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-lg font-semibold text-gray-700">Description</Label>
        <Input
          id="description"
          placeholder="Property details..."
          {...register('description')}
          defaultValue={property.description}
          className={`w-full p-3 border rounded-md shadow-sm ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>
    
      {/* Recommendations */}
      <div className="space-y-2">
        <Label htmlFor="recommendations" className="text-lg font-semibold text-gray-700">Recommendations</Label>
        <Input
          id="recommendations"
          placeholder="E.g., Renovate kitchen"
          {...register('recommendations')}
          defaultValue={property.recommendations}
          className={`w-full p-3 border rounded-md shadow-sm ${errors.recommendations ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.recommendations && <p className="text-sm text-red-500">{errors.recommendations.message}</p>}
      </div>
    

        {/* Submit Button */}
        <Button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500">
        Save Changes
      </Button>

        {/* Error Message */}
        {serverError && <p className="text-sm text-red-500 mt-2">{serverError}</p>}
      </form>
    );
  }
