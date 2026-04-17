import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  services = [
    { name: 'Electrician', img: '/electrician-hero.png', color: '#f59e0b', icon: '⚡' },
    { name: 'Plumbing', img: '/plumb.jpg', color: '#0ea5e9', icon: 'fas fa-tint' },
    { name: 'Carpentry', img: '/carp.jpg', color: '#ea580c', icon: 'fas fa-hammer' },
    { name: 'Construction', img: 'assets/cons.jpg', color: '#64748b', icon: 'fas fa-building' },
    { name: 'Cleaning', img: 'assets/clean.jpg', color: '#d946ef', icon: 'fas fa-sparkles' },
    { name: 'Gardening', img: 'assets/garden.jpg', color: '#22c55e', icon: 'fas fa-seedling' }
  ];

  features = [
    { title: 'Verified Professionals', icon: '🛡️', desc: 'All providers are background-checked.' },
    { title: 'Quick Response', icon: '⏱️', desc: 'Matched within minutes.' },
    { title: 'Quality Guaranteed', icon: '🏅', desc: '100% satisfaction guarantee.' }
  ];

  testimonials = [
    { name: 'Sarah Johnson', role: 'Homeowner', feedback: 'Found an amazing electrician in under 10 minutes!' },
    { name: 'Michael Chen', role: 'Property Manager', feedback: 'Reliable and efficient service every time.' },
    { name: 'Priya Patel', role: 'Homeowner', feedback: 'The booking process is so simple.' }
  ];
}
