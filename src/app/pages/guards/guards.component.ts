import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Guard {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  status: string;
  shift: string;
  site: string;
}

@Component({
  selector: 'app-guards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guards.component.html',
  styleUrls: ['./guards.component.css']
})
export class GuardsComponent {
  guards: Guard[] = [
    { id: 1, name: 'John Doe', phone: '555-1234', email: 'john@guard.com', role: 'Supervisor', status: 'Active', shift: 'Day', site: 'Site A' },
    { id: 2, name: 'Jane Smith', phone: '555-5678', email: 'jane@guard.com', role: 'Guard', status: 'Inactive', shift: 'Night', site: 'Site B' },
    { id: 3, name: 'Mike Brown', phone: '555-9999', email: 'mike@guard.com', role: 'Guard', status: 'Active', shift: 'Day', site: 'Site C' }
  ];

  searchText: string = '';
  roleFilter: string = 'All';
  statusFilter: string = 'All';
  showModal: boolean = false;
  editMode: boolean = false;
  selectedGuard: Guard | null = null;

  get filteredGuards() {
    return this.guards.filter(g =>
      (this.roleFilter === 'All' || g.role === this.roleFilter) &&
      (this.statusFilter === 'All' || g.status === this.statusFilter) &&
      (g.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
       g.email.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  openAddModal() {
    this.selectedGuard = { id: 0, name: '', phone: '', email: '', role: 'Guard', status: 'Active', shift: '', site: '' };
    this.editMode = false;
    this.showModal = true;
  }

  openEditModal(guard: Guard) {
    this.selectedGuard = { ...guard };
    this.editMode = true;
    this.showModal = true;
  }

  saveGuard() {
    if (this.selectedGuard) {
      if (this.editMode) {
        const index = this.guards.findIndex(g => g.id === this.selectedGuard!.id);
        if (index !== -1) this.guards[index] = this.selectedGuard;
      } else {
        this.selectedGuard.id = this.guards.length + 1;
        this.guards.push(this.selectedGuard);
      }
    }
    this.closeModal();
  }

  deleteGuard(guard: Guard) {
    if (confirm(`Delete ${guard.name}?`)) {
      this.guards = this.guards.filter(g => g.id !== guard.id);
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedGuard = null;
  }
}
