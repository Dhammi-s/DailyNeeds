import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) { }

  services = [
    { name: 'Electrician', icon: 'fa-solid fa-bolt', color: '#ff9f1c', img: '/electrician-hero.png' },
    { name: 'Plumbing', icon: 'fa-solid fa-droplet', color: '#00b4d8', img: '/plumb.jpg' },
    { name: 'Carpentry', icon: 'fa-solid fa-hammer', color: '#e65f2b', img: '/carp.jpg' },
    { name: 'Construction', icon: 'fa-solid fa-helmet-safety', color: '#6a7b95', img: '/construction.png' },
    { name: 'Cleaning', icon: 'fa-solid fa-wand-magic-sparkles', color: '#d946ef', img: '/cleaningimage.png' },
    { name: 'Gardening', icon: 'fa-solid fa-seedling', color: '#22c55e', img: '/gargening.png' }
  ];

  features = [
    { title: 'Verified Professionals', icon: '🛡️', desc: 'All providers are background-checked.' },
    { title: 'Quick Response', icon: '⏱️', desc: 'Matched within minutes.' },
    { title: 'Quality Guaranteed', icon: '🏅', desc: '100% satisfaction guarantee.' }
  ];

  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      feedback: 'Found an amazing electrician in under 10 minutes. Professional service and great pricing!',
      avatar: '/construction.png'
    },
    {
      name: 'Michael Chen',
      role: 'Property Manager',
      feedback: 'Daily Needs has become our go-to platform for all maintenance work. Reliable and efficient.',
      avatar: '/construction.png'
    },
    {
      name: 'Priya Patel',
      role: 'Homeowner',
      feedback: 'The booking process is so simple, and the workers are always professional. Highly recommend!',
      avatar: '/construction.png'
    }
  ];

  onLoginClick(event: Event) {
    event.preventDefault(); // Browser di default routing nu block karo
    event.stopPropagation(); // Event bubbling nu roko

    console.log('Login button clicked successfully');

    // Hunn Angular router naal navigate karo
    this.router.navigate(['/login']).then(success => {
      console.log('Navigation Success:', success);
    }).catch(err => {
      console.error('Navigation Error:', err);
    });
  }
}
