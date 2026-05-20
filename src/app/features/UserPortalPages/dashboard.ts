import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Interfaces dadd kar rha haan types track krn lyi
interface Booking {
  id: string;
  providerName: string;
  category: string;
  status: 'In Progress' | 'Accepted';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./style.scss']
})
export class DashboardManager implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initEventListeners();
  }

  private initEventListeners(): void {
    // Sidebar Navigation click tracking
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e: Event) => {
        e.preventDefault();
        navItems.forEach(nav => nav.classList.remove('active'));
        (e.currentTarget as HTMLElement).classList.add('active');

        const targetPage = (e.currentTarget as HTMLElement).getAttribute('data-page');
        console.log(`Navigating to page: ${targetPage}`);
      });
    });

    // Quick Access Cards interaction
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
      card.addEventListener('click', (e: Event) => {
        const category = (e.currentTarget as HTMLElement).getAttribute('data-category');
        console.log(`Opening service category: ${category}`);
        // API call trigger ya filtering logic ithe likh skde ho
      });
    });

    // Chat Button handler
    const chatButtons = document.querySelectorAll('.chat-btn');
    chatButtons.forEach(btn => {
      btn.addEventListener('click', (e: Event) => {
        const provider = (e.target as HTMLElement).getAttribute('data-provider');
        alert(`Starting chat session with: ${provider}`);
      });
    });

    // Promo Button clicks
    const browseBtn = document.getElementById('browseServicesBtn') as HTMLButtonElement;
    if (browseBtn) {
      browseBtn.addEventListener('click', () => {
        console.log('Redirecting to full service catalog...');
      });
    }

    const inviteBtn = document.getElementById('inviteFriendsBtn') as HTMLButtonElement;
    if (inviteBtn) {
      inviteBtn.addEventListener('click', () => {
        console.log('Opening refer and earn modal window.');
      });
    }

    // Logout Flow
    const logoutBtn = document.getElementById('logoutBtn') as HTMLButtonElement;
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to log out?')) {
          console.log('Clearing user cookies/tokens. Goodbye!');
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
