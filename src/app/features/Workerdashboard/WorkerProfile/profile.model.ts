export interface AvailabilityDay {
  id?: string;
  availableDate: string;
  timeSlotId?: string;
  isAvailable: boolean;
}

export interface Skill {
  serviceId?: string;
  serviceName: string;
  experienceYears?: number;
}

export interface Certificate {
  id?: string;
  certificateName: string;
  certificateFileBase64?: string | null;
  expiryDate?: string;
}

export interface WorkerProfile {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  profileImageBase64: string | null;
  bio: string | null;
  hourlyRate: number;
  experienceYears: number;
  serviceArea: string | null;
  skills: Skill[];
  certificates: Certificate[];
  availability: AvailabilityDay[];
}
