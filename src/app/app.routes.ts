import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LiveMapComponent } from './pages/live-map/live-map.component';
import { GuardsComponent } from './pages/guards/guards.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { GuardMobileComponent } from './pages/guard-mobile/guard-mobile.component';
import { AddGuardComponent } from './pages/add-guard/add-guard.component';
import { ManageCheckpointsComponent } from './pages/manage-checkpoints/manage-checkpoints.component';
import { ManageTrajectsComponent } from './pages/manage-trajects/manage-trajects.component';
import { SitesComponent } from './pages/sites/sites.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
    { path: 'add-guard', component: AddGuardComponent },

  { path: 'live-map', component: LiveMapComponent },
  { path: 'guards', component: GuardsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'guard-mobile', component: GuardMobileComponent },
  {path:'manage-checkpoints', component:ManageCheckpointsComponent},
  {path:'manage-trajects',component:ManageTrajectsComponent},
  {path:'sites',component:SitesComponent},
  {path:'clients',component:ClientsComponent},
  {path:'login',component:LoginComponent}
];
