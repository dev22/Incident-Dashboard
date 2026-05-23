## Approach section documents:

I tried to keep the application structure simple and component-driven.

The app is divided into small reusable components:

- FilterBarComponent
- IncidentListComponent
- IncidentDetailComponent
- FormFieldComponent

The business logic and application state are centralized inside IncidentService.
Instead of passing data between multiple components manually, I used Angular Signals to manage state reactively.

The service handles:

- incidents data
- filters
- loading state
- error state
- selected incident

Filtering works like this:

1. The user updates the typed reactive form in `FilterBarComponent`.
2. Form changes are pushed into `IncidentService`.
3. Computed signals recalculate filtered incidents and available UI state.
4. Angular updates the list view automatically.

The filter form is also kept in sync with store state, so resets and future state syncing patterns are easier to support.

This avoids unnecessary subscriptions and keeps the data flow predictable.
I also focused on keeping the CSS maintainable by using SCSS variables for colors, spacing, and reusable styling values, which makes the UI easier to scale and update consistently across the application.

## What I'd improve next

These are the improvements I would make next:

- Replace the mock data source with real API integration through `HttpClient`
- Add dedicated unit tests for `IncidentService`
- Add interaction tests for filtering, retry, selection, and status updates
- Sync filters with URL query params so views are shareable
- Add debounce and distinct filtering for search input
- Improve accessibility with better ARIA labels, focus states, and keyboard support
- Add summary cards or analytics driven from derived incident state
- Improve mobile behavior for the split list/detail layout
- Add pagination, infinite scrolling, or virtual scrolling for larger datasets
- Introduce reusable SCSS mixins and layout utilities where repetition starts to grow

## Testing strategy covers:

- Full IncidentService unit test suite with fakeAsync/tick for the setTimeout mock
- FormFieldComponent isolated tests
- FilterBarComponent interaction tests (spy on svc.setFilters)
- IncidentListComponent tests for all 4 template states (loading/error/empty/data)
