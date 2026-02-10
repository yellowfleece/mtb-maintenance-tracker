/**
 * Core type definitions for MTB Maintenance Tracker
 */

export type BikeType = 'mountain' | 'gravel' | 'hybrid';

export type MaintenanceStatus = 'pending' | 'completed' | 'not_applicable';

export type MaintenancePriority = 'low' | 'medium' | 'high' | 'urgent';

export type MaintenanceCategory =
  | 'Drivetrain'
  | 'Brakes'
  | 'Suspension'
  | 'Wheels'
  | 'Tires'
  | 'Controls'
  | 'Frame'
  | 'Safety'
  | 'General';

export interface Bike {
  id: string;
  name: string;
  type: BikeType;
  year: number | '';
  brand: string;
  model: string;
  purchaseDate: string;
  addedDate: string;
}

export interface MaintenanceItem {
  id: string;
  bikeId: string;
  description: string;
  category: MaintenanceCategory;
  date: string;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  cost: number | '';
  location: string;
  notes: string;
}

export interface Configuration {
  bikeId: string;
  intervals: Record<string, number>; // { category: days }
}

export interface BikeLink {
  id: string;
  bikeId: string;
  label: string;
  url: string;
}

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// Helper type for form inputs where fields might be empty strings
export type FormValue<T> = T | '';

// Utility type for creating new bikes/maintenance items (without id and dates)
export type NewBike = Omit<Bike, 'id' | 'addedDate'>;
export type NewMaintenanceItem = Omit<MaintenanceItem, 'id'>;
export type NewBikeLink = Omit<BikeLink, 'id'>;
