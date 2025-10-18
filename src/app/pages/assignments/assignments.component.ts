import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';

interface Assignment {
  id: number;
  guard: string;
  trajects: string[];
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent {
  assignments: Assignment[] = [];
  filteredAssignments: Assignment[] = [];

  guards: string[] = ['John Doe', 'Ali Ben Salah', 'Mourad Hassen'];
  trajects: string[] = ['Traject A', 'Traject B', 'Traject C'];

  searchTerm: string = '';
  showAddEditModal: boolean = false;
  editMode: boolean = false;
  assignmentForm: FormGroup;
  selectedAssignment?: Assignment;

  constructor(private fb: FormBuilder) {
    this.assignmentForm = this.fb.group({
      guard: [''],
      trajects: this.fb.array([]),
      startDate: [''],
      endDate: ['']
    });
    this.filteredAssignments = [...this.assignments];
  }

  get trajectsFormArray(): FormArray {
    return this.assignmentForm.get('trajects') as FormArray;
  }

  filterAssignments() {
    const term = this.searchTerm.toLowerCase();
    this.filteredAssignments = this.assignments.filter(a =>
      a.guard.toLowerCase().includes(term)
    );
  }

  openAddModal() {
    this.assignmentForm.reset();
    this.trajectsFormArray.clear();
    this.addTrajectField();
    this.editMode = false;
    this.showAddEditModal = true;
  }

  openEditModal(assignment: Assignment) {
    this.assignmentForm.reset();
    this.trajectsFormArray.clear();
    this.selectedAssignment = assignment;
    this.assignmentForm.patchValue({
      guard: assignment.guard,
      startDate: assignment.startDate,
      endDate: assignment.endDate
    });
    assignment.trajects.forEach(t => this.trajectsFormArray.push(this.fb.control(t)));
    this.editMode = true;
    this.showAddEditModal = true;
  }

  addTrajectField() {
    this.trajectsFormArray.push(this.fb.control(''));
  }

  removeTrajectField(index: number) {
    this.trajectsFormArray.removeAt(index);
  }

  saveAssignment() {
    const newAssignment = this.assignmentForm.value;
    if (this.editMode && this.selectedAssignment) {
      const index = this.assignments.indexOf(this.selectedAssignment);
      this.assignments[index] = { ...this.selectedAssignment, ...newAssignment };
    } else {
      const newId = this.assignments.length + 1;
      this.assignments.push({ id: newId, ...newAssignment });
    }
    this.filteredAssignments = [...this.assignments];
    this.closeModal();
  }

  deleteAssignment(id: number) {
    this.assignments = this.assignments.filter(a => a.id !== id);
    this.filteredAssignments = [...this.assignments];
  }

  closeModal() {
    this.showAddEditModal = false;
  }
}
