// Api endpoints for admission cycles

import axios from 'axios';



// // Create an admission cycle
// export const createAdmissionCycle = async (data: AdmissionCycle) => {
//   try {
//     const response = await axios.post(`${API_URL}/property/properties`, data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // get all admission cycles
export const getReservations = async () => {
  try {
    const response = await axios(`/property/reservations`);
    console.log("DEBUG::reservations", response)
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