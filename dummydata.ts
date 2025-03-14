export async function getHostels() {
    return [
        {
          "id": 1,
          "name": "ACITY HOSTEL",
          "image": "https://example.com/hostel3.jpg",
          "location": "ACity Hostel, Block A",
          "capacity": 120,
          "availableSlots": 15,
          "facilities": ["WiFi,", " Laundry,", " Study Area,", " Cafeteria"],
          "pricePerSemester": 1500,
          "gender": "mixed",
          "rating": 4.5,
          "contactInfo": { "phone": "123-456-7890", "email": "sunsethall@example.com" }
        },
        {
          "id": 2,
          "name": "JD Hostel",
          "image": "https://example.com/hostel3.jpg",
          "location": "West Wing, Near Library",
          "capacity": 200,
          "availableSlots": 30,
          "facilities": ["Gym, ", "24/7 Security, ", "Kitchen, " , " Common Room"],
          "pricePerSemester": 1800,
          "gender": "female",
          "rating": 4.7,
          "contactInfo": { "phone": "987-654-3210", "email": "evergreen@example.com" }
        },
        {
          "id": 3,
          "name": "Oceanview Hostel",
          "image": "https://example.com/hostel3.jpg",
          "location": "South Campus, Near Sports Complex",
          "capacity": 90,
          "availableSlots": 5,
          "facilities": ["WiFi, ", " Laundry,", " Private Bathrooms,", " Bicycle Parking"],
          "pricePerSemester": 1600,
          "gender": "male",
          "rating": 4.3,
          "contactInfo": { "phone": "555-123-4567", "email": "oceanview@example.com" }
        },
        {
          "id": 4,
          "name": "Maple Lodge",
          "image": "https://example.com/hostel4.jpg",
          "location": "East Campus, Opposite Cafeteria",
          "capacity": 150,
          "availableSlots": 20,
          "facilities": [" Air Conditioning,", " 24/7 Power Backup,", " Mini Library,", "Parking Space"],
          "pricePerSemester": 1750,
          "gender": "mixed",
          "rating": 4.6,
          "contactInfo": { "phone": "777-888-9999", "email": "maplelodge@example.com" }
        }
      ]      
}