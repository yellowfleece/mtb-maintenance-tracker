# GitHub Issues & Milestones Setup Guide
## Manual Setup Instructions for Modernization Project

**Date:** 2026-02-10
**Repository:** https://github.com/yellowfleece/mtb-maintenance-tracker

---

## Overview

This guide provides step-by-step instructions for setting up GitHub milestones, labels, and issues for the MTB Maintenance Tracker modernization project. Due to GitHub account considerations, these should be created manually through the GitHub web interface.

---

## Part 1: Create Milestones

Navigate to: `https://github.com/yellowfleece/mtb-maintenance-tracker/milestones`

Click "New milestone" and create the following 5 milestones:

### Milestone 1: Foundation & Infrastructure
- **Title:** `Milestone 1: Foundation & Infrastructure (Weeks 1-2)`
- **Due date:** [Set to 2 weeks from start date]
- **Description:**
```
Establish modern development infrastructure without changing features:
- Migrate to TypeScript
- Set up Vitest testing infrastructure
- Configure ESLint, Prettier, and Husky
- Create first smoke tests

Success Criteria: Build passes with TypeScript, at least one test runs successfully, ESLint/Prettier configured
```

### Milestone 2: Architecture Refactoring
- **Title:** `Milestone 2: Architecture Refactoring (Weeks 3-5)`
- **Due date:** [Set to 5 weeks from start date]
- **Description:**
```
Break monolithic App.jsx into modular, testable components:
- Extract UI components (Button, Card, Input, etc.)
- Extract feature components (BikeSelector, Navbar, etc.)
- Create custom hooks (useBikes, useLocalStorage, etc.)
- Build service layer (API, storage, OpenAI)
- Extract page components (Dashboard, Maintenance, etc.)

Success Criteria: App.jsx < 300 lines, 10+ extracted components, all components have tests
```

### Milestone 3: Security & Quality Hardening
- **Title:** `Milestone 3: Security & Quality Hardening (Weeks 6-7)`
- **Due date:** [Set to 7 weeks from start date]
- **Description:**
```
Fix security vulnerabilities and improve code quality:
- Secure API key management (remove from localStorage)
- Add input validation with Zod
- Replace browser alerts with toast notifications
- Add React Error Boundaries
- Achieve 70%+ test coverage

Success Criteria: Zero security vulnerabilities, 70%+ test coverage, no browser alerts
```

### Milestone 4: Performance & Accessibility
- **Title:** `Milestone 4: Performance & Accessibility (Week 8)`
- **Due date:** [Set to 8 weeks from start date]
- **Description:**
```
Optimize performance and ensure WCAG 2.1 AA compliance:
- Add React.memo optimizations
- Implement code splitting with React.lazy
- Add ARIA labels to all icon-only buttons
- Implement keyboard navigation
- Ensure WCAG 2.1 AA color contrast

Success Criteria: Lighthouse score >90, WCAG 2.1 AA compliant, no performance bottlenecks
```

### Milestone 5: Feature Enhancements
- **Title:** `Milestone 5: Feature Enhancements (Weeks 9-10)`
- **Due date:** [Set to 10 weeks from start date]
- **Description:**
```
Add new features and complete SDLC documentation:
- Add IndexedDB support (optional upgrade from localStorage)
- Integrate Supabase for cloud sync (preparation)
- Add CI/CD pipeline with GitHub Actions
- Complete SDLC documentation
- Polish UI/UX

Success Criteria: 2+ new features, complete SDLC documentation, CI/CD pipeline operational
```

---

## Part 2: Create Labels

Navigate to: `https://github.com/yellowfleece/mtb-maintenance-tracker/labels`

Click "New label" and create the following labels:

### Type Labels

1. **modernization**
   - Color: `#0075ca` (blue)
   - Description: `Part of the codebase modernization effort`

2. **legacy-feature**
   - Color: `#7057ff` (purple)
   - Description: `Existing feature that needs modernization`

3. **technical-debt**
   - Color: `#d73a4a` (red)
   - Description: `Technical debt that needs addressing`

4. **security**
   - Color: `#b60205` (dark red)
   - Description: `Security vulnerability or improvement`

5. **accessibility**
   - Color: `#0e8a16` (green)
   - Description: `Accessibility improvement (WCAG compliance)`

### Phase Labels

6. **phase-1**
   - Color: `#1d76db` (blue)
   - Description: `Foundation & Infrastructure (Weeks 1-2)`

7. **phase-2**
   - Color: `#0052cc` (darker blue)
   - Description: `Architecture Refactoring (Weeks 3-5)`

8. **phase-3**
   - Color: `#5319e7` (purple)
   - Description: `Security & Quality Hardening (Weeks 6-7)`

9. **phase-4**
   - Color: `#fbca04` (yellow)
   - Description: `Performance & Accessibility (Week 8)`

10. **phase-5**
    - Color: `#0e8a16` (green)
    - Description: `Feature Enhancements (Weeks 9-10)`

---

## Part 3: Update Existing Issues (#1-6)

For each existing issue, add appropriate labels and milestone assignments:

### Issue #1: Priority System Refactor
- **Labels:** `legacy-feature`, `modernization`, `phase-2`
- **Milestone:** Milestone 2: Architecture Refactoring
- **Note:** This refactor fits well into Phase 2 component extraction

### Issue #2: Strava API Integration
- **Labels:** `phase-5`
- **Milestone:** Milestone 5: Feature Enhancements
- **Note:** Best implemented after architecture modernization

### Issue #3: Component-Level Tracking
- **Labels:** `phase-5`
- **Milestone:** Milestone 5: Feature Enhancements
- **Note:** Requires database schema changes, best done post-modernization

### Issue #4: Maintenance Reminders
- **Labels:** `phase-5`
- **Milestone:** Milestone 5: Feature Enhancements
- **Note:** Requires backend infrastructure

### Issue #5: Mobile Optimization
- **Labels:** `phase-4`, `accessibility`
- **Milestone:** Milestone 4: Performance & Accessibility
- **Note:** Aligns with accessibility improvements

### Issue #6: Cloud Sync
- **Labels:** `phase-5`
- **Milestone:** Milestone 5: Feature Enhancements
- **Note:** Supabase integration happens in Phase 5

---

## Part 4: Create New Modernization Issues

### PHASE 1 ISSUES (Milestone 1)

#### Issue #7: Migrate to TypeScript
```markdown
**Title:** Migrate to TypeScript

**Labels:** modernization, phase-1

**Milestone:** Milestone 1: Foundation & Infrastructure (Weeks 1-2)

**Description:**
Convert the codebase from JavaScript to TypeScript for improved type safety and developer experience.

**Tasks:**
- [ ] Install TypeScript and type definitions (@types/react, @types/react-dom)
- [ ] Configure tsconfig.json with strict mode enabled
- [ ] Rename .jsx files to .tsx incrementally
- [ ] Define core types: Bike, MaintenanceItem, Configuration, BikeLink
- [ ] Fix all type errors
- [ ] Verify build passes with TypeScript

**Success Criteria:**
- All files converted to TypeScript
- Build passes without type errors
- tsconfig.json configured with strict mode

**Priority:** High
**Estimated Time:** 3-5 days

**Related Documentation:** docs/02-Frameworks/ (to be created during implementation)
```

#### Issue #8: Set up Vitest Testing Infrastructure
```markdown
**Title:** Set up Vitest Testing Infrastructure

**Labels:** modernization, phase-1

**Milestone:** Milestone 1: Foundation & Infrastructure (Weeks 1-2)

**Description:**
Establish comprehensive testing infrastructure using Vitest (Vite-native test runner) and React Testing Library.

**Tasks:**
- [ ] Install Vitest and dependencies (jsdom, @testing-library/react, @testing-library/user-event)
- [ ] Configure vitest.config.ts
- [ ] Set up test utilities and helpers
- [ ] Create first smoke test: App renders without crashing
- [ ] Add test scripts to package.json
- [ ] Configure test coverage reporting

**Success Criteria:**
- Vitest configured and running
- At least one test passing
- Coverage reporting configured
- Test utilities set up for future tests

**Priority:** High
**Estimated Time:** 2-3 days

**Related Documentation:** docs/02-Frameworks/ (testing strategy)
```

#### Issue #9: Configure ESLint + Prettier + Husky
```markdown
**Title:** Configure ESLint + Prettier + Husky

**Labels:** modernization, phase-1

**Milestone:** Milestone 1: Foundation & Infrastructure (Weeks 1-2)

**Description:**
Set up code quality tools to enforce consistent code style and catch errors early.

**Tasks:**
- [ ] Install and configure ESLint with TypeScript rules
- [ ] Install and configure Prettier
- [ ] Set up .prettierrc and .prettierignore
- [ ] Configure Husky for pre-commit hooks
- [ ] Add lint-staged for staged file linting
- [ ] Add lint and format scripts to package.json
- [ ] Run formatter on existing codebase
- [ ] Update .vscode/settings.json for editor integration

**Success Criteria:**
- ESLint passes on all TypeScript files
- Prettier formats code consistently
- Pre-commit hooks prevent committing unformatted code
- Zero linting errors

**Priority:** Medium
**Estimated Time:** 1-2 days

**Related Documentation:** docs/02-Frameworks/ (code review checklist)
```

#### Issue #10: Create First Smoke Tests
```markdown
**Title:** Create First Smoke Tests

**Labels:** modernization, phase-1

**Milestone:** Milestone 1: Foundation & Infrastructure (Weeks 1-2)

**Description:**
Create initial smoke tests to ensure the app renders and basic functionality works before refactoring.

**Tasks:**
- [ ] App.test.tsx: App renders without crashing
- [ ] App.test.tsx: Renders with no bikes initially
- [ ] App.test.tsx: Can create a new bike
- [ ] App.test.tsx: Dashboard displays correctly
- [ ] Add test documentation in docs/07-Tests/

**Success Criteria:**
- 4+ smoke tests passing
- Tests run in CI (even if local for now)
- Test coverage report generated

**Priority:** Medium
**Estimated Time:** 1-2 days

**Related Documentation:** docs/07-Tests/
```

---

### PHASE 2 ISSUES (Milestone 2)

#### Issue #11: Extract Common UI Components
```markdown
**Title:** Extract Common UI Components

**Labels:** modernization, phase-2

**Milestone:** Milestone 2: Architecture Refactoring (Weeks 3-5)

**Description:**
Extract reusable UI components from App.jsx to create a component library.

**Tasks:**
- [ ] Create src/components/common/ folder structure
- [ ] Extract Button component (primary, secondary, accent variants)
- [ ] Extract Card component
- [ ] Extract Modal base component
- [ ] Extract Input components (text, date, number, select)
- [ ] Add PropTypes or TypeScript interfaces
- [ ] Write tests for each component
- [ ] Update App.jsx to use extracted components

**Success Criteria:**
- 5+ common components extracted
- All components have TypeScript types
- All components have tests (>80% coverage)
- App.jsx uses extracted components

**Priority:** High
**Estimated Time:** 5-7 days

**Related Documentation:** docs/04-Architecture/ (component architecture)
```

#### Issue #12: Break Down App.jsx - Extract Pages
```markdown
**Title:** Break Down App.jsx - Extract Pages

**Labels:** modernization, phase-2, technical-debt

**Milestone:** Milestone 2: Architecture Refactoring (Weeks 3-5)

**Description:**
Split monolithic App.jsx into page components to reduce file size and improve maintainability.

**Tasks:**
- [ ] Create src/pages/ folder structure
- [ ] Extract Dashboard page component
- [ ] Extract Maintenance page component
- [ ] Extract Configuration page component
- [ ] Extract BikeDetails page component
- [ ] Extract BikeManagement page component
- [ ] Update App.jsx to route to pages
- [ ] Write tests for each page

**Success Criteria:**
- App.jsx < 300 lines
- 5+ page components extracted
- All pages have tests
- All pages have TypeScript types

**Priority:** High
**Estimated Time:** 5-7 days

**Related Documentation:** docs/04-Architecture/ (folder structure)
```

#### Issue #13: Create Custom Hooks
```markdown
**Title:** Create Custom Hooks

**Labels:** modernization, phase-2

**Milestone:** Milestone 2: Architecture Refactoring (Weeks 3-5)

**Description:**
Extract state management logic into reusable custom hooks.

**Tasks:**
- [ ] Create src/hooks/ folder
- [ ] useBikes() - Manage bikes array, CRUD operations, currentBike
- [ ] useLocalStorage(key, defaultValue) - Generic localStorage hook
- [ ] useApiKey() - Load and manage OpenAI API key
- [ ] useMaintenance(bikeId) - Maintenance item operations
- [ ] useConfiguration(bikeId) - Configuration management
- [ ] Write tests for all hooks (using @testing-library/react-hooks)
- [ ] Update components to use custom hooks

**Success Criteria:**
- 5+ custom hooks created
- All hooks have tests
- All hooks have TypeScript types
- Components use hooks instead of direct state management

**Priority:** High
**Estimated Time:** 4-6 days

**Related Documentation:** docs/04-Architecture/ (state management strategy)
```

#### Issue #14: Build Service Layer
```markdown
**Title:** Build Service Layer

**Labels:** modernization, phase-2

**Milestone:** Milestone 2: Architecture Refactoring (Weeks 3-5)

**Description:**
Create service layer to abstract API calls, storage operations, and business logic.

**Tasks:**
- [ ] Create src/services/ folder
- [ ] services/api.ts - Fetch wrapper with error handling
- [ ] services/openai.ts - OpenAI API integration
- [ ] services/storage.ts - localStorage abstractions
- [ ] services/migration.ts - Data version migration logic
- [ ] Write tests for all services (with mocking)
- [ ] Update components to use services

**Success Criteria:**
- 4+ service modules created
- All services have tests
- All services have TypeScript types
- Business logic separated from UI

**Priority:** High
**Estimated Time:** 4-6 days

**Related Documentation:** docs/04-Architecture/ (service layer architecture)
```

#### Issue #15: Create Utility Functions
```markdown
**Title:** Create Utility Functions

**Labels:** modernization, phase-2

**Milestone:** Milestone 2: Architecture Refactoring (Weeks 3-5)

**Description:**
Extract pure utility functions into separate modules for better reusability and testability.

**Tasks:**
- [ ] Create src/utils/ folder
- [ ] utils/bike.ts - createNewBike, bike operations
- [ ] utils/validation.ts - Input validation with Zod
- [ ] utils/date.ts - Date formatting and calculations
- [ ] utils/icons.tsx - Icon mapping functions (getBikeIcon, getCategoryIcon)
- [ ] Write tests for all utilities
- [ ] Update components to use utilities

**Success Criteria:**
- 4+ utility modules created
- All utilities have tests (100% coverage for pure functions)
- All utilities have TypeScript types
- App.jsx reduced by extracting utilities

**Priority:** Medium
**Estimated Time:** 3-4 days

**Related Documentation:** docs/04-Architecture/ (utility patterns)
```

---

### PHASE 3 ISSUES (Milestone 3)

#### Issue #16: Fix Security Vulnerabilities (API Key Management)
```markdown
**Title:** Fix Security Vulnerabilities (API Key Management)

**Labels:** modernization, phase-3, security

**Milestone:** Milestone 3: Security & Quality Hardening (Weeks 6-7)

**Description:**
Remove API keys from localStorage and implement secure backend proxy for OpenAI API calls.

**Tasks:**
- [ ] Research backend proxy options (Netlify Functions, Vercel, etc.)
- [ ] Create backend endpoint for OpenAI API calls
- [ ] Move API key to environment variables (.env)
- [ ] Update services/openai.ts to use backend proxy
- [ ] Remove localStorage API key storage
- [ ] Add API key configuration documentation
- [ ] Test API calls through proxy

**Success Criteria:**
- API keys not stored in browser
- Backend proxy working for API calls
- Environment variable configuration documented
- Zero API key exposure vulnerabilities

**Priority:** Critical
**Estimated Time:** 3-5 days

**Related Documentation:** docs/07-Tests/ (security best practices)
```

#### Issue #17: Add Input Validation with Zod
```markdown
**Title:** Add Input Validation with Zod

**Labels:** modernization, phase-3, security

**Milestone:** Milestone 3: Security & Quality Hardening (Weeks 6-7)

**Description:**
Implement comprehensive input validation using Zod to prevent invalid data and potential XSS.

**Tasks:**
- [ ] Install Zod
- [ ] Create validation schemas for Bike, MaintenanceItem, Configuration, BikeLink
- [ ] Validate bike data on create/edit
- [ ] Validate link URLs (protocol whitelist)
- [ ] Sanitize user input before storage
- [ ] Add validation error messages in UI
- [ ] Write tests for all validation schemas

**Success Criteria:**
- All user inputs validated before storage
- Link URLs restricted to http/https protocols
- Validation error messages displayed to users
- Tests cover all validation scenarios

**Priority:** High
**Estimated Time:** 3-4 days

**Related Documentation:** docs/07-Tests/ (validation patterns)
```

#### Issue #18: Replace Browser Alerts with Toast Notifications
```markdown
**Title:** Replace Browser Alerts with Toast Notifications

**Labels:** modernization, phase-3

**Milestone:** Milestone 3: Security & Quality Hardening (Weeks 6-7)

**Description:**
Replace all 7 browser alert() calls with modern toast notifications for better UX.

**Tasks:**
- [ ] Install Sonner or react-toastify
- [ ] Create toast service wrapper
- [ ] Replace alert in handleDeleteBike
- [ ] Replace alert in handleDeleteConfiguration
- [ ] Replace alert in handleDeleteMaintenanceItem
- [ ] Replace alert in handleDeleteBikeLink
- [ ] Replace alert in generateRecommendations (error handling)
- [ ] Replace alert in data export/import
- [ ] Add success/error toast variants
- [ ] Test all toast notifications

**Success Criteria:**
- Zero browser alert() calls in codebase
- Toast notifications work for all user actions
- Toast notifications are dismissible
- Toast notifications have appropriate types (success, error, warning)

**Priority:** Medium
**Estimated Time:** 2-3 days

**Related Documentation:** docs/07-Tests/ (error handling patterns)
```

#### Issue #19: Add React Error Boundaries
```markdown
**Title:** Add React Error Boundaries

**Labels:** modernization, phase-3

**Milestone:** Milestone 3: Security & Quality Hardening (Weeks 6-7)

**Description:**
Implement React Error Boundaries to gracefully handle errors and prevent app crashes.

**Tasks:**
- [ ] Create ErrorBoundary component
- [ ] Add fallback UI for errors
- [ ] Log errors to console (or future error service)
- [ ] Wrap pages with ErrorBoundary
- [ ] Wrap API calls with try-catch
- [ ] Add retry logic for failed API calls
- [ ] Test error boundary with simulated errors

**Success Criteria:**
- Error boundaries wrap all major components
- Errors don't crash the entire app
- User-friendly error messages displayed
- Errors logged for debugging

**Priority:** Medium
**Estimated Time:** 2-3 days

**Related Documentation:** docs/07-Tests/ (error handling)
```

#### Issue #20: Achieve 70% Test Coverage
```markdown
**Title:** Achieve 70% Test Coverage

**Labels:** modernization, phase-3

**Milestone:** Milestone 3: Security & Quality Hardening (Weeks 6-7)

**Description:**
Write comprehensive tests to achieve 70%+ code coverage across the codebase.

**Tasks:**
- [ ] Test all UI components (Button, Card, Input, etc.)
- [ ] Test all feature components (BikeSelector, Navbar, etc.)
- [ ] Test all pages (Dashboard, Maintenance, etc.)
- [ ] Test all custom hooks (useBikes, useLocalStorage, etc.)
- [ ] Test all services (API, OpenAI, storage)
- [ ] Test all utilities (bike, date, icons, validation)
- [ ] Add integration tests for critical flows (bike creation, maintenance update)
- [ ] Generate coverage report

**Success Criteria:**
- Overall test coverage >70%
- All critical paths have tests
- Coverage report generated in CI
- No untested critical functionality

**Priority:** High
**Estimated Time:** 7-10 days

**Related Documentation:** docs/07-Tests/ (test strategy and coverage goals)
```

---

### PHASE 4 ISSUES (Milestone 4)

#### Issue #21: Performance Optimization (memo, useMemo, useCallback)
```markdown
**Title:** Performance Optimization (memo, useMemo, useCallback)

**Labels:** modernization, phase-4

**Milestone:** Milestone 4: Performance & Accessibility (Week 8)

**Description:**
Optimize React component rendering with memoization techniques.

**Tasks:**
- [ ] Profile app with React DevTools Profiler
- [ ] Wrap expensive components with React.memo
- [ ] Add useMemo for filtered/sorted lists
- [ ] Add useCallback for event handlers
- [ ] Implement code splitting with React.lazy
- [ ] Add Suspense boundaries for lazy-loaded components
- [ ] Re-profile to verify improvements
- [ ] Document performance optimizations

**Success Criteria:**
- Significant reduction in unnecessary re-renders
- Improved Lighthouse performance score (target: >90)
- Lazy loading implemented for pages
- Performance improvements documented

**Priority:** Medium
**Estimated Time:** 3-5 days

**Related Documentation:** docs/05-Design/ (performance optimization strategies)
```

#### Issue #22: Add ARIA Labels and Keyboard Navigation
```markdown
**Title:** Add ARIA Labels and Keyboard Navigation

**Labels:** modernization, phase-4, accessibility

**Milestone:** Milestone 4: Performance & Accessibility (Week 8)

**Description:**
Implement comprehensive accessibility features for keyboard users and screen readers.

**Tasks:**
- [ ] Add aria-label to all icon-only buttons
- [ ] Add aria-describedby to form inputs
- [ ] Add aria-live regions for status updates
- [ ] Implement focus management in modals
- [ ] Add keyboard shortcuts (document in README)
- [ ] Test tab order and focus indicators
- [ ] Add text labels alongside emoji icons
- [ ] Test with screen reader (NVDA or JAWS)

**Success Criteria:**
- All icon-only buttons have accessible names
- Full keyboard navigation support
- Focus traps work in modals
- Screen reader announces all interactive elements
- Tab order is logical

**Priority:** High
**Estimated Time:** 4-6 days

**Related Documentation:** docs/05-Design/ (accessibility guidelines and checklist)
```

#### Issue #23: WCAG 2.1 AA Compliance Audit
```markdown
**Title:** WCAG 2.1 AA Compliance Audit

**Labels:** modernization, phase-4, accessibility

**Milestone:** Milestone 4: Performance & Accessibility (Week 8)

**Description:**
Conduct comprehensive WCAG 2.1 AA compliance audit and fix all violations.

**Tasks:**
- [ ] Run automated accessibility audit (axe DevTools)
- [ ] Ensure color contrast meets WCAG AA (4.5:1 for text)
- [ ] Add skip-to-content link
- [ ] Use semantic heading hierarchy (h1 → h6)
- [ ] Ensure all forms are properly labeled
- [ ] Test with keyboard only (no mouse)
- [ ] Test with screen reader
- [ ] Generate accessibility audit report
- [ ] Document accessibility features

**Success Criteria:**
- Zero critical accessibility violations
- WCAG 2.1 AA compliant
- Lighthouse accessibility score >90
- Audit report generated

**Priority:** High
**Estimated Time:** 3-5 days

**Related Documentation:** docs/05-Design/ (accessibility audit report)
```

---

### PHASE 5 ISSUES (Milestone 5)

#### Issue #24: Add IndexedDB Support
```markdown
**Title:** Add IndexedDB Support

**Labels:** modernization, phase-5

**Milestone:** Milestone 5: Feature Enhancements (Weeks 9-10)

**Description:**
Implement IndexedDB support as an optional upgrade from localStorage for users with larger datasets.

**Tasks:**
- [ ] Install Dexie.js (IndexedDB wrapper)
- [ ] Design IndexedDB schema with indexes
- [ ] Create IndexedDBAdapter implementing StorageAdapter interface
- [ ] Build migration tool (localStorage → IndexedDB)
- [ ] Add storage adapter selection (localStorage vs IndexedDB)
- [ ] Test with large datasets (100+ bikes, 1000+ maintenance items)
- [ ] Add "Migrate to IndexedDB" option in UI
- [ ] Document IndexedDB features

**Success Criteria:**
- IndexedDB working for all data operations
- Migration from localStorage successful
- Performance improved for large datasets
- Users can choose storage adapter

**Priority:** Medium
**Estimated Time:** 5-7 days

**Related Documentation:** docs/04-Architecture/ (ADR-002-database-strategy.md)
```

#### Issue #25: Integrate Supabase for Cloud Sync
```markdown
**Title:** Integrate Supabase for Cloud Sync

**Labels:** modernization, phase-5

**Milestone:** Milestone 5: Feature Enhancements (Weeks 9-10)

**Description:**
Prepare Supabase integration for future cloud sync (initial setup, no full implementation yet).

**Tasks:**
- [ ] Create Supabase project
- [ ] Design PostgreSQL schema (see ADR-002)
- [ ] Set up database tables and indexes
- [ ] Configure row-level security
- [ ] Create Supabase client service
- [ ] Document Supabase setup for future implementation
- [ ] Add feature flag for cloud sync (disabled by default)

**Success Criteria:**
- Supabase project created and configured
- Database schema implemented
- Documentation complete for future sync implementation
- Feature flag in place for gradual rollout

**Priority:** Low
**Estimated Time:** 3-5 days

**Related Documentation:** docs/04-Architecture/ (ADR-002-database-strategy.md)
```

#### Issue #26: Add CI/CD Pipeline with GitHub Actions
```markdown
**Title:** Add CI/CD Pipeline with GitHub Actions

**Labels:** modernization, phase-5

**Milestone:** Milestone 5: Feature Enhancements (Weeks 9-10)

**Description:**
Set up automated CI/CD pipeline for testing, building, and deploying the application.

**Tasks:**
- [ ] Create .github/workflows/ci.yml
- [ ] Add automated testing on PR
- [ ] Add automated linting on PR
- [ ] Add build verification on PR
- [ ] Configure automatic deployment to Netlify/Vercel
- [ ] Add environment-based configuration
- [ ] Add status badges to README
- [ ] Test full CI/CD workflow

**Success Criteria:**
- Tests run automatically on every PR
- Build failures prevent merging
- Automatic deployment on main branch
- CI/CD pipeline documented

**Priority:** Medium
**Estimated Time:** 2-3 days

**Related Documentation:** docs/06-Development/ (onboarding guide)
```

---

### MASTER TRACKING ISSUE

#### Issue #27: Complete Modernization Tracker
```markdown
**Title:** 🚀 Complete Modernization Tracker - 5-Phase Roadmap

**Labels:** modernization

**Milestone:** (No milestone - tracks all milestones)

**Description:**
Master tracking issue for the complete modernization effort. This issue links to all phase-specific issues and provides overall progress tracking.

## Modernization Overview

This project is undergoing a comprehensive 5-phase modernization to transform it from a learning project into a maintainable, secure, and scalable production application.

**Timeline:** 8-10 weeks
**Start Date:** [To be determined]
**End Date:** [To be determined]

**Master Plan:** See `docs/00-Planning/MODERNIZATION-MASTER-PLAN.md`

---

## Phase 1: Foundation & Infrastructure (Weeks 1-2)

**Milestone:** [Milestone 1: Foundation & Infrastructure](link)

### Issues
- [ ] #7 Migrate to TypeScript
- [ ] #8 Set up Vitest Testing Infrastructure
- [ ] #9 Configure ESLint + Prettier + Husky
- [ ] #10 Create First Smoke Tests

**Success Criteria:** ✅ Build passes with TypeScript, at least one test runs successfully, ESLint/Prettier configured

---

## Phase 2: Architecture Refactoring (Weeks 3-5)

**Milestone:** [Milestone 2: Architecture Refactoring](link)

### Issues
- [ ] #11 Extract Common UI Components
- [ ] #12 Break Down App.jsx - Extract Pages
- [ ] #13 Create Custom Hooks
- [ ] #14 Build Service Layer
- [ ] #15 Create Utility Functions

**Success Criteria:** ✅ App.jsx < 300 lines, 10+ extracted components, all components have tests

---

## Phase 3: Security & Quality Hardening (Weeks 6-7)

**Milestone:** [Milestone 3: Security & Quality Hardening](link)

### Issues
- [ ] #16 Fix Security Vulnerabilities (API Key Management)
- [ ] #17 Add Input Validation with Zod
- [ ] #18 Replace Browser Alerts with Toast Notifications
- [ ] #19 Add React Error Boundaries
- [ ] #20 Achieve 70% Test Coverage

**Success Criteria:** ✅ Zero security vulnerabilities, 70%+ test coverage, no browser alerts

---

## Phase 4: Performance & Accessibility (Week 8)

**Milestone:** [Milestone 4: Performance & Accessibility](link)

### Issues
- [ ] #21 Performance Optimization (memo, useMemo, useCallback)
- [ ] #22 Add ARIA Labels and Keyboard Navigation
- [ ] #23 WCAG 2.1 AA Compliance Audit

**Success Criteria:** ✅ Lighthouse score >90, WCAG 2.1 AA compliant, no performance bottlenecks

---

## Phase 5: Feature Enhancements (Weeks 9-10)

**Milestone:** [Milestone 5: Feature Enhancements](link)

### Issues
- [ ] #24 Add IndexedDB Support
- [ ] #25 Integrate Supabase for Cloud Sync
- [ ] #26 Add CI/CD Pipeline with GitHub Actions

**Success Criteria:** ✅ 2+ new features, complete SDLC documentation, CI/CD pipeline operational

---

## Legacy Feature Issues (Updated with Milestones)

- [ ] #1 Priority System Refactor (Milestone 2)
- [ ] #2 Strava API Integration (Milestone 5)
- [ ] #3 Component-Level Tracking (Milestone 5)
- [ ] #4 Maintenance Reminders (Milestone 5)
- [ ] #5 Mobile Optimization (Milestone 4)
- [ ] #6 Cloud Sync (Milestone 5)

---

## Overall Progress

**Phases Completed:** 0/5
**Milestones Completed:** 0/5
**Issues Completed:** 0/26

**Current Phase:** Repository Setup (Pre-Phase 1)
**Next Up:** Phase 1 - Foundation & Infrastructure

---

## Key Documentation

- [Modernization Master Plan](../docs/00-Planning/MODERNIZATION-MASTER-PLAN.md)
- [Decision Log](../docs/00-Planning/DECISION-LOG.md)
- [Current State Assessment](../docs/01-Discovery/current-state-assessment.md)
- [Code Quality Review](../docs/01-Discovery/code-quality-review.md)
- [Database Strategy ADR](../docs/04-Architecture/ADR-002-database-strategy.md)

---

## Updates

**2026-02-10:** Repository structure setup complete, ready to begin Phase 1
```

---

## Summary

Once you've created all milestones, labels, and issues:

1. **Milestones:** 5 total (Foundation, Architecture, Security, Performance, Features)
2. **Labels:** 10 total (5 type labels + 5 phase labels)
3. **Updated Issues:** 6 existing issues (#1-6) with new labels and milestones
4. **New Issues:** 20 modernization issues (#7-26)
5. **Master Tracker:** 1 comprehensive tracking issue (#27)

**Total Work:** 27 issues across 5 milestones over 8-10 weeks

---

**Setup Date:** 2026-02-10
**Repository:** https://github.com/yellowfleece/mtb-maintenance-tracker
