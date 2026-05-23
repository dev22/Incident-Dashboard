import { Injectable } from '@angular/core';
import { MOCK_INCIDENTS } from '../data/mock-incidents';
import { Incident } from '../models/incident.model';

@Injectable({ providedIn: 'root' })
export class IncidentDataSourceService {
  public async getIncidents(): Promise<readonly Incident[]> {
    await this.simulateLatency(900);

    return MOCK_INCIDENTS;
  }

  private simulateLatency(durationMs: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, durationMs);
    });
  }
}
