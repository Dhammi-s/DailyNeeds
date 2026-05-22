export interface DashboardStats {
  todayEarnings: number;
  earningsChange: string;
  activeJobsCount: number;
  activeJobsChange: string;
  rating: number;
  ratingChange: string;
  monthEarnings: number;
  monthEarningsChange: string;
}

export interface Job {
  id: string;
  customerName: string;
  serviceType: string;
  avatar: string;
  time: string;
  address: string;
  progress?: number;
  price?: number;
  status: 'Active' | 'Pending' | 'Completed' | 'Declined';
}

export interface DashboardData {
  workerName: string;
  stats: DashboardStats;
  activeJobs: Job[];
  pendingRequests: Job[];
}
