import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './features/incidents/pages/incident-dashboard-page/incident-dashboard-page.component'
      ).then((m) => m.IncidentDashboardPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
