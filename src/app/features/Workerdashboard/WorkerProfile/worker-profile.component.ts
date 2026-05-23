import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { WorkerProfile, AvailabilityDay, Certificate, Skill } from './profile.model';

@Component({
  selector: 'app-worker-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe], // <-- Include DatePipe here
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss']
})
export class WorkerProfileComponent implements OnInit, AfterViewInit {
  profileData!: WorkerProfile;
  workerId: string | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // ngOnInit runs on server too — skip all browser-only logic here
  }

  ngAfterViewInit(): void {
    // Runs only in browser after hydration
    if (!isPlatformBrowser(this.platformId)) return;

    this.workerId = this.authService.getUserIdFromToken();
    console.log('WorkerId:', this.workerId);
    console.log('Token:', this.authService.getToken() ? 'exists' : 'MISSING');

    if (this.workerId) {
      this.loadWorkerProfile();
    } else {
      this.isLoading = false;
      this.errorMessage = 'Session expired or token invalid. Please login again.';
    }
  }


  loadWorkerProfile(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.apiService.get(`Worker/${this.workerId}`).subscribe({
      next: (data: any) => {
        this.isLoading = false;

        // Defensive data assignment: enforces fallbacks so loops don't break
        this.profileData = {
          ...data,
          skills: data.skills || [],
          certificates: data.certificates || [],
          availability: data.availability || []
        };
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
