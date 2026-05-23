import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentService } from '../../services/incident.service';
import {
  INCIDENT_STATUS_OPTIONS,
  IncidentStatus,
} from '../../models/incident.model';

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident-detail.component.html',
  styleUrl: './incident-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentDetailComponent {
  public readonly incidentStore = inject(IncidentService);
  public readonly statuses = INCIDENT_STATUS_OPTIONS;

  public closeDetailPanel(): void {
    this.incidentStore.clearSelectedIncident();
  }

  public updateIncidentStatus(id: string, status: IncidentStatus): void {
    this.incidentStore.updateIncidentStatus(id, status);
  }
}
