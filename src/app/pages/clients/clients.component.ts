import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Client {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
}

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  clients: Client[] = [
    { name: 'Client A', email: 'a@email.com', phone: '12345678', address: 'Street 1', zipCode: '1000' },
    { name: 'Client B', email: 'b@email.com', phone: '87654321', address: 'Street 2', zipCode: '2000' }
  ];

  filteredClients: Client[] = [...this.clients];
  searchTerm = '';
  showModal = false;
  editMode = false;
  newClient: Client = { name: '', email: '', phone: '', address: '', zipCode: '' };

  openAddModal() {
    this.editMode = false;
    this.newClient = { name: '', email: '', phone: '', address: '', zipCode: '' };
    this.showModal = true;
  }

  openEditModal(client: Client) {
    this.editMode = true;
    this.newClient = { ...client };
    this.showModal = true;
  }

  saveClient() {
    if (this.editMode) {
      const index = this.clients.findIndex(c => c === this.newClient);
      if (index !== -1) this.clients[index] = { ...this.newClient };
    } else {
      this.clients.push({ ...this.newClient });
    }
    this.filterClients();
    this.closeModal();
  }

  deleteClient(client: Client) {
    this.clients = this.clients.filter(c => c !== client);
    this.filterClients();
  }

  closeModal() {
    this.showModal = false;
  }

  filterClients() {
    const term = this.searchTerm.toLowerCase();
    this.filteredClients = this.clients.filter(c => c.name.toLowerCase().includes(term));
  }
}
