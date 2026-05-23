import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident-list.component.html',
  styleUrl: './incident-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentListComponent {
  public readonly incidentStore = inject(IncidentService);

  public selectIncident(incidentId: string, event?: Event): void {
    event?.preventDefault();
    this.incidentStore.selectIncident(incidentId);
  }
}
