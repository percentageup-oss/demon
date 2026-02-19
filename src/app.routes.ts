
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatComponent } from './components/chat/chat.component';
import { PapersComponent } from './components/papers/papers.component';
import { PlannerComponent } from './components/planner/planner.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'papers', component: PapersComponent },
  { path: 'planner', component: PlannerComponent },
];
