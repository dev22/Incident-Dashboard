import { SelectOption } from '../shared/models/select-option.model';

export const INCIDENT_STATUSES = [
  'open',
  'investigating',
  'resolved',
  'closed',
] as const;

export const INCIDENT_SEVERITIES = [
  'critical',
  'high',
  'medium',
  'low',
] as const;

export type IncidentStatus = (typeof INCIDENT_STATUSES)[number];
export type IncidentSeverity = (typeof INCIDENT_SEVERITIES)[number];

export interface Incident {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: IncidentStatus;
  readonly severity: IncidentSeverity;
  readonly service: string;
  readonly assignee: string;
}

export interface IncidentFilters {
  search: string;
  status: IncidentStatus | '';
  severity: IncidentSeverity | '';
  service: string;
}

export const DEFAULT_INCIDENT_FILTERS: IncidentFilters = Object.freeze({
  search: '',
  status: '',
  severity: '',
  service: '',
});

export const INCIDENT_STATUS_OPTIONS: readonly SelectOption<IncidentStatus>[] =
  Object.freeze([
    { label: 'Open', value: 'open' },
    { label: 'Investigating', value: 'investigating' },
    { label: 'Resolved', value: 'resolved' },
    { label: 'Closed', value: 'closed' },
  ]);

export const INCIDENT_STATUS_FILTER_OPTIONS: readonly SelectOption<
  IncidentFilters['status']
>[] = Object.freeze([
  { label: 'All Statuses', value: '' },
  ...INCIDENT_STATUS_OPTIONS,
]);

export const INCIDENT_SEVERITY_FILTER_OPTIONS: readonly SelectOption<
  IncidentFilters['severity']
>[] = Object.freeze([
  { label: 'All Severities', value: '' },
  { label: 'Critical', value: 'critical' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
]);
