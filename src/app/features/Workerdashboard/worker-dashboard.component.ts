import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { DashboardData, Job } from './worker-dashboard.model';

@Component({
  selector: 'app-worker-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './worker-dashboard.component.html',
  styleUrls: ['./worker-dashboard.component.scss']
})
export class WorkerDashboardComponent implements OnInit {
  dashboardData!: DashboardData;
  currentWorkerId: string | null = null;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentWorkerId = this.authService.getUserIdFromToken();
    if (this.currentWorkerId) {
      this.loadDashboard();
    } else {
      console.error('Worker ID not found. Please login again.');
    }
  }

  loadDashboard(): void {
    this.apiService.get(`worker/${this.currentWorkerId}`).subscribe({
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
