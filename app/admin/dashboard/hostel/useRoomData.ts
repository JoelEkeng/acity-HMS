import { useEffect, useState } from 'react';
import axios from 'axios';

export function useRoomData() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://acityhost-backend.onrender.com/api/rooms')
      .then(res => setRooms(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { rooms, loading };
}
