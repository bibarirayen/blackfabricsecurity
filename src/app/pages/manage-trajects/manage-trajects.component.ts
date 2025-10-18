import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Checkpoint {
  name: string;
  location: string;
  verificationType: string;
}

interface Client {
  id: number;
  name: string;
}

interface Traject {
  id: number;
  name: string;
  description: string;
  duration: string;
  checkpoints: Checkpoint[];
  clientId?: number;
  client?: Client;
}

@Component({
  selector: 'app-manage-trajects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-trajects.component.html',
  styleUrls: ['./manage-trajects.component.css']
})
export class ManageTrajectsComponent {
searchName: string = '';
selectedClientId?: number;
  // Mock clients
  clients: Client[] = [
    { id: 1, name: 'Client A' },
    { id: 2, name: 'Client B' },
    { id: 3, name: 'Client C' }
  ];

  // Mock trajects
  trajects: Traject[] = [
    {
      id: 1,
      name: 'Downtown Patrol',
      description: 'Main city center patrol route',
      duration: '45 mins',
      checkpoints: [
        { name: 'Entrance Gate', location: 'Main Gate A', verificationType: 'QR Scan' },
        { name: 'Lobby', location: 'Ground floor', verificationType: 'NFC' }
      ],
      clientId: 1,
      client: { id: 1, name: 'Client A' }
    },
    {
      id: 2,
      name: 'Harbor Security',
      description: 'Port and docking area route',
      duration: '60 mins',
      checkpoints: [
        { name: 'Dock 3', location: 'Harbor Zone C', verificationType: 'QR Scan' },
        { name: 'Dock 7', location: 'Harbor Zone D', verificationType: 'Manual Check' }
      ],
      clientId: 2,
      client: { id: 2, name: 'Client B' }
    }
  ];

  showModal = false;
  isEditing = false;

  newTraject: Traject = {
    id: 0,
    name: '',
    description: '',
    duration: '',
    checkpoints: [],
    clientId: undefined
  };

  applyFilter() {
  this.trajects = this.trajects.filter(t => {
    const matchesName = t.name.toLowerCase().includes(this.searchName.toLowerCase());
    const matchesClient = this.selectedClientId ? t.clientId === this.selectedClientId : true;
    return matchesName && matchesClient;
  })};
  // Open add modal
  openAddModal() {
    this.isEditing = false;
    this.newTraject = { id: 0, name: '', description: '', duration: '', checkpoints: [], clientId: undefined };
    this.showModal = true;
  }

  // Open edit modal
  openEditModal(traject: Traject) {
    this.isEditing = true;
    this.newTraject = JSON.parse(JSON.stringify(traject)); // deep copy
    this.showModal = true;
  }

  // Add checkpoint
  addCheckpoint() {
    this.newTraject.checkpoints.push({
      name: '',
      location: '',
      verificationType: 'QR Scan'
    });
  }

  // Remove checkpoint
  removeCheckpoint(index: number) {
    this.newTraject.checkpoints.splice(index, 1);
  }

  // Save or update traject
  saveTraject() {
    const selectedClient = this.clients.find(c => c.id === this.newTraject.clientId);
    this.newTraject.client = selectedClient;

    if (this.isEditing) {
      const index = this.trajects.findIndex(t => t.id === this.newTraject.id);
      if (index !== -1) {
        this.trajects[index] = { ...this.newTraject };
      }
    } else {
      this.newTraject.id = this.trajects.length + 1;
      this.trajects.push({ ...this.newTraject });
    }

    this.showModal = false;
  }

  // Delete traject
  deleteTraject(id: number) {
    this.trajects = this.trajects.filter(t => t.id !== id);
  }

  // Close modal
  closeModal() {
    this.showModal = false;
  }
}
