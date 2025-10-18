import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Report {
  id: number;
  type: string;
  client: string;
  officer: string;
  site: string;
  dateEntered: string;
  // Incident Fields
  incidentInternalId?: string;
  incidentDateTime?: string;
  incidentType?: string;
  victimName?: string;
  victimContact?: string;
  suspectName?: string;
  suspectContact?: string;
  witnessNames?: string;
  incidentLocation?: string;
  incidentSummary?: string;
  responderPoliceNames?: string;
  responderFireTruck?: string;
  responderAmbulance?: string;
  incidentDetails?: string;
  incidentActions?: string;
  policeCalled?: boolean;
  // Daily
  dailyShiftStartNotes?: string;
  dailyPostShift?: string;
  dailySpecialInstructions?: string;
  dailyPostItemsReceived?: string;
  dailyObservations?: string;
  dailyRelievingFirst?: string;
  dailyRelievingLast?: string;
  dailyAdditionalNotes?: string;
  // Maintenance
  maintenanceType?: string;
  maintenanceDetails?: string;
  maintenanceWhoNotified?: string;
  maintenanceEmailClient?: boolean;
  // Parking
  violatorFirst?: string;
  violatorLast?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleLP?: string;
  vehicleVIN?: string;
  vehicleColor?: string;
  violationType?: string;
  violationNumber?: string;
  parkingLocation?: string;
  parkingFine?: string;
  parkingDetails?: string;
  vehicleTowed?: boolean;
  // Images
  images?: string[];
    [key: string]: any; // <-- ADD THIS

}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent {
  reports: Report[] = [];
  reportTypes = [
    'Incident Report',
    'Daily Activity Report',
    'Maintenance Report',
    'Parking Violation Report',
  ];

  filterForm: FormGroup;
  selectedReport?: Report;
  viewModalOpen = false;
  editModalOpen = false;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      client: [''],
      officer: [''],
      reportType: [''],
      dateFrom: [''],
      dateTo: [''],
    });

    // Example reports
    this.reports = [
      {
        id: 1,
        type: 'Incident Report',
        client: 'Client A',
        officer: 'Officer 1',
        site: 'Site 1',
        dateEntered: '2025-10-16',
        incidentInternalId: 'INC001',
        incidentDateTime: '2025-10-16 08:00',
        incidentType: 'Theft',
        victimName: 'John Doe',
        victimContact: '12345678',
        suspectName: 'Unknown',
        suspectContact: '',
        witnessNames: 'Jane Doe',
        incidentLocation: 'Main Gate',
        incidentSummary: 'Suspect stole item',
        responderPoliceNames: 'Officer X',
        responderFireTruck: 'Truck 1',
        responderAmbulance: 'Ambulance 1',
        incidentDetails: 'Detailed description',
        incidentActions: 'Officer actions',
        policeCalled: true,
        images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/100'],
      },
    ];
  }

  openView(report: Report) {
    this.selectedReport = report;
    this.viewModalOpen = true;
  }

  closeView() {
    this.viewModalOpen = false;
    this.selectedReport = undefined;
  }

  openEdit(report: Report) {
    this.selectedReport = { ...report }; // clone for editing
    this.editModalOpen = true;
  }

  closeEdit() {
    this.editModalOpen = false;
    this.selectedReport = undefined;
  }

  saveEdit() {
    if (!this.selectedReport) return;
    const index = this.reports.findIndex(r => r.id === this.selectedReport!.id);
    if (index >= 0) this.reports[index] = this.selectedReport!;
    this.closeEdit();
  }

  deleteReport(report: Report) {
    this.reports = this.reports.filter(r => r.id !== report.id);
  }

  markReviewed(report: Report) {
    alert(`Report ${report.id} marked as reviewed`);
  }

  applyFilter() {
    alert('Filter applied (mock)');
  }
}
