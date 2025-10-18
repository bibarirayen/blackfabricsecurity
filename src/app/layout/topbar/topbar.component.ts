import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarService } from '../../services/siderbar.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
constructor(private sidebarService: SidebarService) {}
  @Output() toggleSidebar = new EventEmitter<void>();

  toggleSidebarr() {
    this.sidebarService.toggleSidebar();
  }
}
