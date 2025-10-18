import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-guard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // 👈 AJOUT ICI
  templateUrl: './add-guard.component.html',
  styleUrl: './add-guard.component.css'
})
export class AddGuardComponent {
guardForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.guardForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', Validators.required],
      Password: ['', Validators.required],
      City: ['', Validators.required],
      Country: ['', Validators.required],
      PostalCode: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.guardForm.valid && this.selectedFile) {
      const formData = new FormData();
      Object.keys(this.guardForm.value).forEach(key => {
        formData.append(key, this.guardForm.value[key]);
      });
      formData.append("profilePic", this.selectedFile);

      this.http.post('http://localhost:8080/api/guards', formData).subscribe({
        next: (res) => alert("Guard added successfully"),
        error: (err) => console.error(err)
      });
    }
  }
}
