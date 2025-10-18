import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

interface Site {
  id: number;
  name: string;
  location: string;
  client: string;
  description?: string;
  floor?: string;
  photos?: string[];
}

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent {
  sites: Site[] = [];
  filteredSites: Site[] = [];
  clients: string[] = ['Client A', 'Client B', 'Client C'];

  searchTerm: string = '';
  selectedClient: string = '';

  showAddEditModal = false;
  showViewModal = false;
  editMode = false;

  selectedSite?: Site;

  siteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.siteForm = this.fb.group({
      name: [''],
      location: [''],
      client: [''],
      description: [''],
      floor: [''],
      photos: [[]]
    });

    this.filteredSites = [...this.sites];
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase();
    this.filteredSites = this.sites.filter(s =>
      s.name.toLowerCase().includes(term) &&
      (this.selectedClient ? s.client === this.selectedClient : true)
    );
  }

  openAddModal() {
    this.editMode = false;
    this.siteForm.reset({ photos: [] });
    this.showAddEditModal = true;
  }

  openEditModal(site: Site) {
    this.editMode = true;
    this.selectedSite = site;
    this.siteForm.patchValue({ ...site, photos: site.photos || [] });
    this.showAddEditModal = true;
  }

  openViewModal(site: Site) {
    this.selectedSite = site;
    this.showViewModal = true;
  }

  closeModal() {
    this.showAddEditModal = false;
    this.showViewModal = false;
  }

  saveSite() {
    const formValue = this.siteForm.value;
    const newSite: Site = { ...formValue, photos: formValue.photos || [] };

    if (this.editMode && this.selectedSite) {
      const index = this.sites.findIndex(s => s.id === this.selectedSite!.id);
      if (index > -1) this.sites[index] = { ...this.selectedSite, ...newSite };
    } else {
      const newId = this.sites.length + 1;
    }

    this.filteredSites = [...this.sites];
    this.closeModal();
  }

  deleteSite(id: number) {
    this.sites = this.sites.filter(s => s.id !== id);
    this.filteredSites = [...this.sites];
  }

  onPhotoUpload(event: any) {
    const files = event.target.files;
    if (!files) return;

    const photos: string[] = this.siteForm.value.photos ?? [];
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        photos.push(e.target.result);
        this.siteForm.patchValue({ photos });
      };
      reader.readAsDataURL(file);
    }
  }
}
