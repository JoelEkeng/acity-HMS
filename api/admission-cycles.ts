// Api endpoints for admission cycles
import { API_URL } from './config';
import { getUserContent } from '@/app/(utilities)/djangoApi';

const axios = require('axios').default;

type AdmissionCycle = {
  id: number;
  client_property_name: string;
  uuid: string;
  status: string;
  created_at: string;
  updated_at: string;
  start_date: string;
  end_date: string;
  tenancy_start_date: string;
  tenancy_end_date: string;
  payment_info: string;
  description: string;
  client_property: number;
  exception_units: any[];
};


// // Create an admission cycle
// export const createAdmissionCycle = async (data: AdmissionCycle) => {
//   try {
//     const response = await axios.post(`${API_URL}/property/properties`, data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// get all admission cycles
export const getAdmissionCycles = async () => {
  try {
    const response = await getUserContent(`/property/tenant-admission-cycles`, '');
    console.log("DEBUG::get-admission-cycles", response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

// // Get a property by id
// export const getProperty = async (id: number) => {
//   try {
//     const response = await axios.get(`${API_URL}/properties/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Update a property
// export const updateProperty = async (id: number, data: AdmissionCycle) => {
//   try {
//     const response = await axios.put(`${API_URL}/properties/${id}`, data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Patch a property
// export const patchProperty = async (id: number, data: AdmissionCycle) => {
//   try {
//     const response = await axios.patch(`${API_URL}/properties/${id}`, data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // Delete a property
// export const deleteProperty = async (id: number) => {
//   try {
//     const response = await axios.delete(`${API_URL}/properties/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
