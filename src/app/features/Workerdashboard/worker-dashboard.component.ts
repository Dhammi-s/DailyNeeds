import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 1. Eh import add karo
import { ApiService } from '../../core/services/api.service';
import { DashboardData, Job } from './worker-dashboard.model';

@Component({
  selector: 'app-worker-dashboard',
  standalone: true, // 👈 Je standalone true ae
  imports: [CommonModule], // 👈 2. imports array vich CommonModule pao
  templateUrl: './worker-dashboard.component.html',
  styleUrls: ['./worker-dashboard.component.scss']
})
export class WorkerDashboardComponent implements OnInit {
  dashboardData!: DashboardData;
  currentWorkerId: string = 'worker_john_01';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.apiService.get(`worker/${this.currentWorkerId}/dashboard`).subscribe({
      next: (data: any) => {
        this.dashboardData = data as DashboardData;
      },
      error: (err: any) => {
        console.error('Failed to load portal updates', err);
      }
    });
  }

  onUpdateStatus(job: Job): void {
    const currentProgress: number = job.progress || 0;
    const nextProgress: number = currentProgress >= 100 ? 100 : currentProgress + 20;
    const nextStatus: string = nextProgress === 100 ? 'Completed' : 'Active';

    const payload = { status: nextStatus, progress: nextProgress };

    this.apiService.put(`jobs/${job.id}`, payload).subscribe({
      next: (response: any) => {
        job.progress = nextProgress;
        if (nextProgress === 100) {
          this.dashboardData.activeJobs = this.dashboardData.activeJobs.filter((j: Job) => j.id !== job.id);
        }
      },
      error: (err: any) => console.error(err)
    });
  }

  onAcceptRequest(request: Job): void {
    const payload = { status: 'Active', progress: 0 };

    this.apiService.put(`jobs/${request.id}`, payload).subscribe({
      next: (response: any) => {
        this.dashboardData.pendingRequests = this.dashboardData.pendingRequests.filter((r: Job) => r.id !== request.id);
        const newActiveJob: Job = { ...request, status: 'Active', progress: 0 };
        this.dashboardData.activeJobs.push(newActiveJob);
        this.dashboardData.stats.activeJobsCount += 1;
      },
      error: (err: any) => console.error(err)
    });
  }

  onDeclineRequest(request: Job): void {
    const payload = { status: 'Declined' };

    this.apiService.put(`jobs/${request.id}`, payload).subscribe({
      next: (response: any) => {
        this.dashboardData.pendingRequests = this.dashboardData.pendingRequests.filter((r: Job) => r.id !== request.id);
      },
      error: (err: any) => console.error(err)
    });
  }
}
