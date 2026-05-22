export interface AvailabilityDay {
  id?: number;
  dayOfWeek: string; // "Monday", "Tuesday", etc.
  startTime: string;  // "09:00"
  endTime: string;    // "17:00"
  isAvailable: boolean;
}

export interface Certificate {
  id?: number;
  certificateName: string;
  issuingOrganization?: string;
  issueDate?: string;
  expirationDate?: string;
  credentialUrl?: string;
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
  skills: string[];
  certificates: Certificate[];
  availability: AvailabilityDay[];
}
