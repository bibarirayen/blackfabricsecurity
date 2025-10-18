import { Component, Input } from '@angular/core';
import { SidebarService } from '../../services/siderbar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isVisible: boolean = true;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.sidebarVisible$.subscribe(value => {
      this.isVisible = value;
    });
  }
}
