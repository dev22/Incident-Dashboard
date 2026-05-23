import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  DEFAULT_INCIDENT_FILTERS,
  INCIDENT_SEVERITY_FILTER_OPTIONS,
  INCIDENT_STATUS_FILTER_OPTIONS,
  IncidentFilters,
} from '../../models/incident.model';
import { IncidentService } from '../../services/incident.service';
import {
  FieldConfig,
  FormFieldComponent,
  SelectFieldConfig,
} from '../form-field/form-field.component';

interface IncidentFilterForm {
  search: FormControl<string>;
  status: FormControl<IncidentFilters['status']>;
  severity: FormControl<IncidentFilters['severity']>;
  service: FormControl<string>;
}

const SEARCH_FIELD_CONFIG: FieldConfig = {
  label: 'Search by title or ID…',
  type: 'text',
  controlName: 'search',
};

const STATUS_FIELD_CONFIG: SelectFieldConfig<IncidentFilters['status']> = {
  label: 'Status',
  type: 'select',
  controlName: 'status',
  options: INCIDENT_STATUS_FILTER_OPTIONS,
};

const SEVERITY_FIELD_CONFIG: SelectFieldConfig<IncidentFilters['severity']> = {
  label: 'Severity',
  type: 'select',
  controlName: 'severity',
  options: INCIDENT_SEVERITY_FILTER_OPTIONS,
};

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldComponent],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBarComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  public readonly incidentStore = inject(IncidentService);
  public readonly filterForm: FormGroup<IncidentFilterForm> =
    this.formBuilder.group({
      search: this.formBuilder.control(DEFAULT_INCIDENT_FILTERS.search),
      status: this.formBuilder.control(DEFAULT_INCIDENT_FILTERS.status),
      severity: this.formBuilder.control(DEFAULT_INCIDENT_FILTERS.severity),
      service: this.formBuilder.control(DEFAULT_INCIDENT_FILTERS.service),
    });
  public readonly searchFieldConfig = SEARCH_FIELD_CONFIG;
  public readonly secondaryFieldConfigs = computed<readonly FieldConfig[]>(
    () => [
      STATUS_FIELD_CONFIG,
      SEVERITY_FIELD_CONFIG,
      {
        label: 'Service',
        type: 'select',
        controlName: 'service',
        options: this.incidentStore.serviceFilterOptions(),
      },
    ],
  );
  public readonly hasActiveFilters = computed(() => {
    const filters = this.incidentStore.filters();

    return !!(
      filters.search ||
      filters.status ||
      filters.severity ||
      filters.service
    );
  });

  public constructor() {
    effect(() => {
      const filters = this.incidentStore.filters();

      untracked(() => {
        this.filterForm.patchValue(filters, { emitEvent: false });
      });
    });
  }

  public ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.incidentStore.setFilters(this.filterForm.getRawValue());
      });
  }

  public resetFilters(): void {
    this.incidentStore.resetFilters();
  }
}
