import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Checkpoint {
  clientName?: string; // Added client name
  trajectId: number;
  name: string;
  location: string;
  verificationType: string;
  description?: string;
  photos?: string[];
}

interface Client {
  id: number;
  name: string;
}

@Component({
  selector: 'app-manage-checkpoints',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-checkpoints.component.html',
  styleUrls: ['./manage-checkpoints.component.css']
})
export class ManageCheckpointsComponent implements OnInit {
  searchName: string = '';
  selectedClient: string = '';
  filteredCheckpoints: Checkpoint[] = [];

  clients: Client[] = [
    { id: 1, name: 'Client A' },
    { id: 2, name: 'Client B' },
    { id: 3, name: 'Client C' }
  ];

  checkpoints: Checkpoint[] = [
    {
      clientName: 'Client A',
      trajectId: 1,
      name: 'Checkpoint Alpha',
      location: 'Near Gate A',
      verificationType: 'QR Scan',
      description: 'Main entry checkpoint, guards must scan before shift.',
      photos: ['https://picsum.photos/200', 'https://picsum.photos/201']
    },
    {
      clientName: 'Client B',
      trajectId: 2,
      name: 'Checkpoint Beta',
      location: 'North Parking',
      verificationType: 'NFC',
      description: 'NFC tag is placed near the guard booth.',
      photos: ['https://picsum.photos/202']
    }
  ];

  showModal = false;
  showViewModal = false;
  isEditing = false;
  newCheckpoint: Checkpoint = this.resetCheckpoint();
  selectedCheckpoint?: Checkpoint;

  ngOnInit() {
    this.filteredCheckpoints = [...this.checkpoints];
  }

  resetCheckpoint(): Checkpoint {
    return {
      clientName: '',
      trajectId: 0,
      name: '',
      location: '',
      verificationType: 'QR Scan',
      description: '',
      photos: []
    };
  }

  openAddModal() {
    this.isEditing = false;
    this.newCheckpoint = this.resetCheckpoint();
    this.showModal = true;
  }

  openEditModal(checkpoint: Checkpoint) {
    this.isEditing = true;
    this.newCheckpoint = { ...checkpoint };
    this.showModal = true;
  }

  openViewModal(checkpoint: Checkpoint) {
    this.selectedCheckpoint = checkpoint;
    this.showViewModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.showViewModal = false;
  }

  saveCheckpoint() {
    if (this.isEditing) {
      const index = this.checkpoints.findIndex(c => c.name === this.newCheckpoint.name);
      if (index > -1) this.checkpoints[index] = this.newCheckpoint;
    } else {
      this.checkpoints.push(this.newCheckpoint);
    }
    this.applyFilter(); // Update filtered list
    this.closeModal();
  }

  deleteCheckpoint(name: string) {
    this.checkpoints = this.checkpoints.filter(c => c.name !== name);
    this.applyFilter(); // Update filtered list
  }

  onPhotoUpload(event: any) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.newCheckpoint.photos?.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  applyFilter() {
    this.filteredCheckpoints = this.checkpoints.filter(c => {
      const matchesName = c.name.toLowerCase().includes(this.searchName.toLowerCase());
      const matchesClient = this.selectedClient ? c.clientName === this.selectedClient : true;
      return matchesName && matchesClient;
    });
  }
}
