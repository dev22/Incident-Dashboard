import { Incident } from '../models/incident.model';

export const MOCK_INCIDENTS: readonly Incident[] = [
  {
    id: 'INC-0001',
    title: 'Payment Gateway Timeout',
    description:
      'Users are experiencing timeouts when attempting to complete purchases. The payment processor is returning 504 errors intermittently. Engineering is investigating the root cause which appears to be related to a recent deployment to the payment microservice.',
    status: 'investigating',
    severity: 'critical',
    service: 'Payments',
    assignee: 'Aisha Patel',
  },
  {
    id: 'INC-0002',
    title: 'Auth Service High Latency',
    description:
      'Authentication service latency has spiked above 2000ms p99, causing slow login experiences across all web and mobile clients.',
    status: 'open',
    severity: 'high',
    service: 'Auth',
    assignee: 'Carlos Mendez',
  },
  {
    id: 'INC-0003',
    title: 'Email Notifications Delayed',
    description:
      'Transactional email notifications are delayed by up to 45 minutes. Notification queue is backed up due to a slow SMTP relay.',
    status: 'investigating',
    severity: 'medium',
    service: 'Notifications',
    assignee: 'Priya Sharma',
  },
  {
    id: 'INC-0004',
    title: 'CDN Cache Invalidation Failure',
    description:
      'Static assets are not being properly invalidated from the CDN edge nodes, causing stale content to be served to end users after deploys.',
    status: 'resolved',
    severity: 'medium',
    service: 'Infrastructure',
    assignee: 'James Liu',
  },
  {
    id: 'INC-0005',
    title: 'Search Index Out of Sync',
    description:
      'Product search results are returning outdated data. The Elasticsearch sync job failed silently after a schema migration.',
    status: 'open',
    severity: 'high',
    service: 'Search',
    assignee: 'Unassigned',
  },
  {
    id: 'INC-0006',
    title: 'Database Connection Pool Exhausted',
    description:
      'Primary database connection pool reached capacity during peak traffic, causing intermittent 500 errors on read-heavy endpoints.',
    status: 'resolved',
    severity: 'critical',
    service: 'Database',
    assignee: 'Fatima Al-Rashid',
  },
  {
    id: 'INC-0007',
    title: 'Mobile Push Notification Delivery Drop',
    description:
      'FCM push notification delivery rate dropped to 60% for Android devices. iOS unaffected. Issue traced to expired service account credentials.',
    status: 'closed',
    severity: 'low',
    service: 'Notifications',
    assignee: 'Ethan Brooks',
  },
  {
    id: 'INC-0008',
    title: 'API Rate Limiter False Positives',
    description:
      'Rate limiter is incorrectly throttling legitimate API requests from enterprise customers, returning 429 responses ahead of threshold.',
    status: 'investigating',
    severity: 'high',
    service: 'API Gateway',
    assignee: 'Leila Nouri',
  },
  {
    id: 'INC-0009',
    title: 'Dashboard Slow Load Times',
    description:
      'Analytics dashboard pages are timing out for users with large datasets. N+1 query issue introduced in v3.2.1 release.',
    status: 'open',
    severity: 'low',
    service: 'Analytics',
    assignee: 'Marco Rossi',
  },
  {
    id: 'INC-0010',
    title: 'Webhook Delivery Failures',
    description:
      'Third-party webhook integrations failing with TLS handshake errors after certificate renewal on the webhook proxy service.',
    status: 'closed',
    severity: 'medium',
    service: 'Integrations',
    assignee: 'Sofia Tanaka',
  },
];
