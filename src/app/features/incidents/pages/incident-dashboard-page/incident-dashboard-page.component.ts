import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FilterBarComponent } from '../../../../components/filter-bar/filter-bar.component';
import { IncidentDetailComponent } from '../../../../components/incident-detail/incident-detail.component';
import { IncidentListComponent } from '../../../../components/incident-list/incident-list.component';
import { IncidentService } from '../../../../services/incident.service';

@Component({
  selector: 'app-incident-dashboard-page',
  standalone: true,
  imports: [
    FilterBarComponent,
    IncidentDetailComponent,
    IncidentListComponent,
  ],
  templateUrl: './incident-dashboard-page.component.html',
  styleUrl: './incident-dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentDashboardPageComponent implements OnInit {
  public readonly incidentStore = inject(IncidentService);

  public ngOnInit(): void {
    void this.incidentStore.loadIncidents();
  }
}
