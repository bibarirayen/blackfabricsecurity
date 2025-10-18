import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { TopbarComponent } from "./layout/topbar/topbar.component";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'prototype';
  sidebarVisible = true;
  showLayout = true;

  constructor(private router: Router) {
    // detect route changes and hide layout on login page
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showLayout = !event.url.includes('/login');
      });
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
