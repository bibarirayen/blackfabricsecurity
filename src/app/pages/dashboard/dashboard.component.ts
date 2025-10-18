import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
onRefresh() {
  window.location.reload();
}
kpis = [
    { title: 'Active Guards', value: 24, icon: 'fa-user-shield', color: 'bg-primary', textColor: 'text-white' },
    { title: 'Open Reports', value: 7, icon: 'fa-clipboard-list', color: 'bg-success', textColor: 'text-white' },
    { title: 'Sites Covered', value: 12, icon: 'fa-building', color: 'bg-info', textColor: 'text-white' },
    { title: 'Checkpoints Today', value: 156, icon: 'fa-map-marker-alt', color: 'bg-warning', textColor: 'text-dark' },
  ];

  quickActions = [
    { label: 'Add New Guard', icon: 'fa-user-plus', color: 'btn-outline-primary' },
    { label: 'Add New Site', icon: 'fa-building', color: 'btn-outline-success' },
    { label: 'Export Reports', icon: 'fa-file-export', color: 'btn-outline-info' },
  ];

  guards = [
    { name: 'John Smith', status: 'status-active', location: 'Site A - Main Gate', shift: 'Day Shift' },
    { name: 'Sarah Johnson', status: 'status-patrol', location: 'Site B - North Wing', shift: 'Night Shift' },
    { name: 'Mike Wilson', status: 'status-break', location: 'Site A - Break Room', shift: 'Day Shift' },
    { name: 'Lisa Brown', status: 'status-active', location: 'Site C - Parking Lot', shift: 'Evening Shift' },
    { name: 'David Lee', status: 'status-alert', location: 'Site A - Emergency', shift: 'Day Shift' },
    { name: 'Emma Davis', status: 'status-inactive', location: 'Off Duty', shift: 'Night Shift' }
  ];
}
