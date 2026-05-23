import {
  Injectable,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import {
  DEFAULT_INCIDENT_FILTERS,
  Incident,
  IncidentFilters,
  IncidentStatus,
} from '../models/incident.model';
import { SelectOption } from '../shared/models/select-option.model';
import { IncidentDataSourceService } from './incident-data-source.service';

@Injectable({ providedIn: 'root' })
export class IncidentService {
  private readonly incidentDataSource = inject(IncidentDataSourceService);

  private readonly _incidents = signal<Incident[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _hasLoaded = signal(false);
  private readonly _filters = signal<IncidentFilters>(DEFAULT_INCIDENT_FILTERS);
  private readonly _selectedIncidentId = signal<string | null>(null);

  public readonly loading = this._loading.asReadonly();
  public readonly error = this._error.asReadonly();
  public readonly filters = this._filters.asReadonly();
  public readonly selectedIncidentId = this._selectedIncidentId.asReadonly();

  public readonly serviceNames = computed<readonly string[]>(() =>
    [...new Set(this._incidents().map(({ service }) => service))].sort(
      (left, right) => left.localeCompare(right),
    ),
  );

  public readonly serviceFilterOptions = computed<
    readonly SelectOption<string>[]
  >(() => [
    { label: 'All Services', value: '' },
    ...this.serviceNames().map((service) => ({
      label: service,
      value: service,
    })),
  ]);

  public readonly filteredIncidents = computed(() => {
    const filters = this._filters();
    const searchQuery = filters.search.trim().toLowerCase();

    return this._incidents().filter((inc) => {
      const matchSearch =
        !searchQuery ||
        inc.title.toLowerCase().includes(searchQuery) ||
        inc.id.toLowerCase().includes(searchQuery);
      const matchStatus = !filters.status || inc.status === filters.status;
      const matchSeverity =
        !filters.severity || inc.severity === filters.severity;
      const matchService = !filters.service || inc.service === filters.service;

      return matchSearch && matchStatus && matchSeverity && matchService;
    });
  });

  public readonly selectedIncident = computed(
    () =>
      this._incidents().find(({ id }) => id === this._selectedIncidentId()) ??
      null,
  );

  public constructor() {
    effect(() => {
      const selectedIncidentId = this._selectedIncidentId();

      if (!selectedIncidentId) {
        return;
      }

      const isSelectedIncidentVisible = this.filteredIncidents().some(
        ({ id }) => id === selectedIncidentId,
      );

      if (isSelectedIncidentVisible) {
        return;
      }

      untracked(() => {
        this._selectedIncidentId.set(null);
      });
    });
  }

  public async loadIncidents(force = false): Promise<void> {
    if (this._loading() || (this._hasLoaded() && !force)) {
      return;
    }

    this._loading.set(true);
    this._error.set(null);

    try {
      const incidents = await this.incidentDataSource.getIncidents();

      this._incidents.set([...incidents]);
      this._hasLoaded.set(true);
    } catch (error) {
      console.error('Unable to load incidents', error);
      this._error.set('Unable to load incidents right now. Please retry.');
    } finally {
      this._loading.set(false);
    }
  }

  public setFilters(partial: Partial<IncidentFilters>): void {
    this._filters.update((filters) => ({ ...filters, ...partial }));
  }

  public resetFilters(): void {
    this._filters.set(DEFAULT_INCIDENT_FILTERS);
  }

  public selectIncident(id: string): void {
    this._selectedIncidentId.set(id);
  }

  public clearSelectedIncident(): void {
    this._selectedIncidentId.set(null);
  }

  public updateIncidentStatus(id: string, status: IncidentStatus): void {
    this._incidents.update((list) =>
      list.map((i) => (i.id === id ? { ...i, status } : i)),
    );
  }
}
