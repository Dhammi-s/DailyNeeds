import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { WorkerProfile, AvailabilityDay, Certificate, Skill } from './profile.model';

@Component({
  selector: 'app-worker-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss']
})
export class WorkerProfileComponent implements OnInit {
  profileData!: WorkerProfile;
  workerId: string | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Exact same Cookie token verification parsing technique matching your auth module system state 
    this.workerId = this.authService.getUserIdFromToken();

    console.log('WorkerId from token:', this.workerId);
    if (this.workerId) {
      this.loadWorkerProfile();
    } else {
      this.errorMessage = 'Session expired or token invalid. Please login again.';
      console.error('Session Token context error: userId extraction failed.');
    }
  }

  loadWorkerProfile(): void {
    this.isLoading = true;
    this.errorMessage = null;
    console.log('Calling API: Worker/' + this.workerId);
    // Route matching your endpoint schema: Worker/{id}
    this.apiService.get(`Worker/${this.workerId}`).subscribe({
      next: (data: any) => {
        console.log('API Response:', data);
        this.isLoading = false;
        this.profileData = data as WorkerProfile;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = `API Error ${err.status}: ${err.message}`;
        console.error('API Error:', err);
      }
    });
  }

  addSkillTag(inputElement: HTMLInputElement): void {
    const value = inputElement.value.trim();
    if (value && !this.profileData.skills.find(s => s.serviceName === value)) {
      this.profileData.skills.push({ serviceName: value });
      inputElement.value = '';
    }
  }

  removeSkillTag(index: number): void {
    this.profileData.skills.splice(index, 1);
  }

  addCertificateNode(titleInput: HTMLInputElement): void {
    const title = titleInput.value.trim();
    if (title) {
      const newCert: Certificate = {
        certificateName: title
      };
      this.profileData.certificates.push(newCert);
      titleInput.value = '';
    }
  }

  removeCertificate(index: number): void {
    this.profileData.certificates.splice(index, 1);
  }

  // Handle image updates and export string context values inside base64 profiles natively
  onAvatarUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profileData.profileImageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSaveChanges(): void {
    // API structure payload sync controller module matching your PUT updates endpoints
    this.apiService.put(`Worker/${this.workerId}`, this.profileData).subscribe({
      next: (response: any) => {
        alert('Worker Portal Profile changes successfully pushed to production API database streams!');
      },
      error: (err: any) => {
        console.error('Data serialization parsing synchronization error:', err);
      }
    });
  }

  resetForm(): void {
    if (this.workerId) {
      this.loadWorkerProfile();
    }
  }
}
