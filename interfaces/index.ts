/* eslint-disable */

export type Reservation = {
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
  };

export interface hostelCardProps {
  id: number;
  name: string;
  location: string;
  image: string;
  price?: number;
  facilities: string[];
  gender: "male" | "female" | "mixed";
  onBook?: (id: number) => void;
}


export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Escalated';
export type TicketPriority = 'Low' | 'Medium' | 'High';

export interface MaintenanceTicket {
  id: string;
  studentId: string;
  roomNumber: string;
  title: string;
  description: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

