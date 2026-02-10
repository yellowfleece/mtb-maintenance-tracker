# MTB Maintenance Tracker: Modernization Master Plan
## "Plan of the Plan" - Strategic Roadmap for Complete Codebase Update

**Date:** 2026-02-10
**Current Version:** 260209
**Status:** Planning Phase

---

## Executive Summary

The MTB Maintenance Tracker is a production-ready React application with comprehensive features (multi-bike management, AI-powered recommendations, data persistence). However, it was built as a learning project and now requires systematic modernization to align with current best practices, improved skillsets, and modern tooling.

This document provides a strategic, phased approach to methodically review, refactor, and enhance the entire codebase while leveraging your existing SDLC framework (9-phase structure in `/docs/`).

---

## Current State Assessment

### What Works Well
- ✅ Complete feature set with professional UI/UX
- ✅ Data persistence with version migration
- ✅ OpenAI integration for recommendations
- ✅ Comprehensive README documentation (7,600+ words)
- ✅ Established SDLC folder structure (01-Discovery through 09-Archive)
- ✅ GitHub issue templates for project management
- ✅ Clean git history and recent documentation improvements

### Critical Issues Requiring Attention
- ⚠️ **Monolithic Architecture**: Single 2,611-line App.jsx file
- ⚠️ **No Type Safety**: Pure JavaScript with no TypeScript or PropTypes
- ⚠️ **Security Vulnerabilities**: API keys in localStorage, no input validation
- ⚠️ **No Testing**: Zero test coverage, no test framework configured
- ⚠️ **Performance**: No memoization, pagination, or optimization
- ⚠️ **Accessibility**: Missing ARIA labels, emoji-only icons, no keyboard nav focus
- ⚠️ **State Management**: Heavy prop drilling, no centralized state
- ⚠️ **Error Handling**: Browser alerts instead of modern toast notifications

---

## Strategic Approach: 5-Phase Modernization Plan

This master plan breaks the modernization into 5 major phases, each with its own sub-tasks aligned with your SDLC structure. Each phase should be treated as a mini-project with dedicated planning, execution, and validation.

---

## PHASE 1: Foundation & Infrastructure (Weeks 1-2)

**Goal:** Establish modern development infrastructure without changing features

### 1.1 Development Environment Setup
- [ ] Migrate to TypeScript
  - Install TypeScript and type definitions
  - Configure tsconfig.json with strict mode
  - Rename .jsx → .tsx incrementally
  - Define core types: `Bike`, `MaintenanceItem`, `Configuration`, `BikeLink`

- [ ] Testing Infrastructure
  - Install Vitest (Vite-native test runner)
  - Configure test environment (jsdom, testing-library/react)
  - Set up test utilities and helpers
  - Create first smoke test: App renders without crashing

- [ ] Code Quality Tools
  - Enhance ESLint with TypeScript rules
  - Add Prettier for consistent formatting
  - Configure Husky for pre-commit hooks
  - Add lint-staged for staged file linting

- [ ] Documentation
  - **SDLC Location:** `docs/02-Frameworks/`
  - Document: TypeScript migration guide
  - Document: Testing strategy and patterns
  - Document: Code review checklist

**Success Criteria:** Build passes with TypeScript, at least one test runs successfully, ESLint/Prettier configured

**Deliverables:**
- tsconfig.json
- vitest.config.ts
- .prettierrc
- Husky pre-commit hook
- Framework documentation in docs/02-Frameworks/

---

## PHASE 2: Architecture Refactoring (Weeks 3-5)

**Goal:** Break monolithic App.jsx into modular, testable components

### 2.1 Component Extraction
- [ ] Create folder structure:
  ```
  src/
  ├── components/
  │   ├── BikeSelector/
  │   ├── Navbar/
  │   ├── modals/
  │   └── common/
  ├── pages/
  ├── hooks/
  ├── services/
  ├── utils/
  └── types/
  ```

- [ ] Extract UI Components (smallest units first)
  - Button variants (primary, secondary, accent)
  - Card component
  - Modal base component
  - Input components (text, date, number, select)
  - Icon utilities (centralize getBikeIcon, getCategoryIcon)

- [ ] Extract Feature Components
  - BikeSelector → standalone component
  - Navbar → standalone component
  - BikeLinks → standalone component

- [ ] Extract Page Components
  - Dashboard → pages/Dashboard/
  - Maintenance → pages/Maintenance/
  - Configuration → pages/Configuration/
  - BikeDetails → pages/BikeDetails/
  - BikeManagement → pages/BikeManagement/

- [ ] Extract Modals
  - AddBikeModal → components/modals/
  - EditBikeModal → components/modals/
  - RecommendationModal → components/modals/

### 2.2 Custom Hooks
- [ ] `useBikes()` - Manage bikes array, CRUD operations, currentBike
- [ ] `useLocalStorage(key, defaultValue)` - Generic localStorage hook
- [ ] `useApiKey()` - Load and manage OpenAI API key
- [ ] `useMaintenance(bikeId)` - Maintenance item operations
- [ ] `useConfiguration(bikeId)` - Configuration management

### 2.3 Service Layer
- [ ] `services/api.ts` - Fetch wrapper with error handling
- [ ] `services/openai.ts` - OpenAI API integration
- [ ] `services/storage.ts` - localStorage abstractions
- [ ] `services/migration.ts` - Data version migration logic

### 2.4 Utilities
- [ ] `utils/bike.ts` - createNewBike, bike operations
- [ ] `utils/validation.ts` - Input validation with Zod
- [ ] `utils/date.ts` - Date formatting and calculations
- [ ] `utils/icons.tsx` - Icon mapping functions

### 2.5 Documentation
- **SDLC Location:** `docs/04-Architecture/`
- Document: Component architecture diagram
- Document: State management strategy
- Document: Folder structure and conventions
- ADR: Why custom hooks over Redux/Context

**Success Criteria:** App.jsx < 300 lines, all components have tests, builds successfully

**Deliverables:**
- Modular component structure
- 5+ custom hooks
- Service layer abstractions
- Architecture documentation in docs/04-Architecture/

---

## PHASE 3: Security & Quality Hardening (Weeks 6-7)

**Goal:** Fix security vulnerabilities and improve code quality

### 3.1 Security Fixes
- [ ] **API Key Management**
  - Remove API keys from localStorage
  - Create backend proxy for OpenAI API calls
  - Add environment variable configuration
  - Document secure API key handling

- [ ] **Input Validation**
  - Install Zod for schema validation
  - Validate bike data on create/edit
  - Validate link URLs (protocol whitelist)
  - Sanitize user input before storage

- [ ] **Security Headers** (if deploying)
  - Add Content Security Policy
  - Configure CORS if backend added
  - Add rate limiting for API calls

### 3.2 Error Handling
- [ ] Replace `alert()` with toast notifications
  - Install Sonner or react-toastify
  - Create toast service wrapper
  - Replace all 7 alert instances

- [ ] Add React Error Boundary
  - Create ErrorBoundary component
  - Add fallback UI for errors
  - Log errors to console or service

- [ ] Improve async error handling
  - Add try-catch to all async operations
  - Add retry logic for API calls
  - Implement AbortController for request cancellation

### 3.3 Testing Coverage
- [ ] Component Tests
  - Test all UI components (Button, Card, Input)
  - Test all feature components (BikeSelector, Navbar)
  - Test all pages (Dashboard, Maintenance, etc.)
  - Test modals (AddBike, EditBike, Recommendations)

- [ ] Hook Tests
  - Test useBikes() CRUD operations
  - Test useLocalStorage() persistence
  - Test useMaintenance() status updates

- [ ] Integration Tests
  - Test bike creation flow
  - Test maintenance status updates
  - Test data export/import
  - Test recommendation generation

- [ ] Aim for 70%+ code coverage

### 3.4 Documentation
- **SDLC Location:** `docs/07-Tests/`
- Document: Test strategy and coverage goals
- Document: Security best practices
- Document: Error handling patterns

**Success Criteria:** Zero security vulnerabilities, 70%+ test coverage, no browser alerts

**Deliverables:**
- Secure API key handling
- Comprehensive test suite
- Error boundaries and toast notifications
- Security documentation in docs/07-Tests/

---

## PHASE 4: Performance & Accessibility (Week 8)

**Goal:** Optimize performance and ensure WCAG 2.1 AA compliance

### 4.1 Performance Optimization
- [ ] React Performance
  - Wrap expensive components with React.memo
  - Add useMemo for filtered/mapped lists
  - Add useCallback for event handlers
  - Profile with React DevTools Profiler

- [ ] Code Splitting
  - Lazy load pages with React.lazy
  - Add Suspense boundaries
  - Split large components

- [ ] Data Optimization
  - Debounce localStorage writes
  - Batch state updates
  - Add pagination for maintenance lists (if >20 items)
  - Consider virtual scrolling for large lists (react-window)

### 4.2 Accessibility Improvements
- [ ] ARIA Labels
  - Add aria-label to all icon-only buttons
  - Add aria-describedby to form inputs
  - Add aria-live regions for status updates

- [ ] Keyboard Navigation
  - Implement focus management in modals
  - Add keyboard shortcuts documentation
  - Test tab order and focus indicators

- [ ] Visual Improvements
  - Add text labels alongside emoji icons
  - Ensure color contrast meets WCAG AA
  - Add skip-to-content link
  - Use semantic heading hierarchy (h1 → h6)

- [ ] Screen Reader Testing
  - Test with NVDA or JAWS
  - Add alt text where needed
  - Ensure forms are properly labeled

### 4.3 Documentation
- **SDLC Location:** `docs/05-Design/`
- Document: Accessibility guidelines and checklist
- Document: Performance optimization strategies
- Document: Keyboard shortcuts

**Success Criteria:** Lighthouse score >90, WCAG 2.1 AA compliant, no performance bottlenecks

**Deliverables:**
- Optimized components with memo/useMemo
- Full accessibility support
- Accessibility audit report
- Design documentation in docs/05-Design/

---

## PHASE 5: Feature Enhancement & Polish (Weeks 9-10)

**Goal:** Add new features and complete SDLC documentation

### 5.1 New Features (Prioritized from PROJECT-SNAPSHOT.md roadmap)
- [ ] **Mileage Tracking Integration**
  - Strava API integration OR manual mileage entry
  - Update maintenance intervals based on actual mileage
  - Display mileage since last maintenance

- [ ] **Component-Level Tracking**
  - Track individual components (chain, cassette, brake pads)
  - Associate maintenance items with components
  - Component lifecycle and replacement history

- [ ] **Push Notifications** (if web app)
  - Web Push API for maintenance reminders
  - Configurable notification preferences
  - Notification scheduling service

- [ ] **Data Sync** (optional)
  - Cloud backup integration (Firebase, Supabase)
  - Multi-device sync
  - Offline-first architecture

### 5.2 UI/UX Polish
- [ ] Improve mobile responsiveness
- [ ] Add loading skeletons
- [ ] Add empty states with helpful CTAs
- [ ] Improve animation and transitions
- [ ] Add dark mode support

### 5.3 Complete SDLC Documentation
- [ ] **01-Discovery/**
  - User research and personas
  - Competitive analysis (TrainingPeaks, Strava maintenance)

- [ ] **03-PRDs/**
  - Feature requirements for new additions
  - User stories and acceptance criteria

- [ ] **06-Development/**
  - Onboarding guide for contributors
  - Development environment setup
  - Coding standards and conventions

- [ ] **08-Feedback/**
  - User feedback collection plan
  - Iteration retrospectives
  - Change request template

### 5.4 Deployment & CI/CD
- [ ] Set up GitHub Actions for CI
- [ ] Automated testing on PR
- [ ] Automated deployment (Vercel, Netlify, etc.)
- [ ] Environment-based configuration

**Success Criteria:** 2+ new features, complete SDLC documentation, CI/CD pipeline

**Deliverables:**
- New features based on roadmap
- Complete SDLC documentation across all 9 phases
- CI/CD pipeline
- Deployment documentation

---

## Execution Strategy

### How to Use This Plan

This master plan should be executed as **5 separate planning sessions** with Claude Code:

1. **For Each Phase:**
   - Start a new Claude Code session
   - Reference this master plan document
   - Ask Claude to create a detailed implementation plan for that specific phase
   - Use the `EnterPlanMode` to get a detailed, executable plan
   - Execute the plan with Claude's assistance
   - Document results in appropriate SDLC folder

2. **Use SDLC Structure:**
   - Each phase maps to specific SDLC folders
   - Document decisions in appropriate phase folders
   - Use GitHub issue templates to track work
   - Create PRs for each major refactoring

3. **Iterative Approach:**
   - Don't attempt all phases at once
   - Complete Phase 1 fully before moving to Phase 2
   - Test thoroughly after each phase
   - Maintain working application throughout

4. **Documentation First:**
   - Before coding, document the plan in appropriate SDLC folder
   - Use PRD template for features
   - Use ADR template for architectural decisions
   - Update PROJECT-SNAPSHOT.md after each phase

---

## Risk Management

### Potential Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking existing features | High | Comprehensive test suite, incremental refactoring |
| TypeScript migration complexity | Medium | Gradual migration, start with new files |
| API key backend requirement | Medium | Keep localStorage fallback for local dev |
| Performance regression | Low | Profile before/after, benchmark critical paths |
| Scope creep | Medium | Stick to phase objectives, defer enhancements |

---

## Success Metrics

### How to Measure Success

- **Phase 1:** TypeScript builds, 1+ test passes
- **Phase 2:** App.jsx < 300 lines, 10+ extracted components
- **Phase 3:** 70%+ test coverage, zero security alerts
- **Phase 4:** Lighthouse score >90, WCAG AA compliant
- **Phase 5:** 2+ new features, complete SDLC docs

### Long-term Goals
- **Code Quality:** Maintainable, testable, type-safe
- **Security:** Production-ready with secure API handling
- **Performance:** Fast, responsive, optimized
- **Accessibility:** Inclusive, keyboard-navigable, screen-reader friendly
- **Documentation:** Complete SDLC artifacts for reference

---

## Next Steps

### Immediate Actions (Today)

1. **Review this master plan** - Ensure alignment with your vision
2. **Choose starting phase** - Recommend Phase 1 (Foundation)
3. **Create GitHub milestone** - Track progress for Phase 1
4. **Start Phase 1 planning** - Use `EnterPlanMode` with Claude Code
5. **Document decisions** - Use docs/02-Frameworks/ for Phase 1 artifacts

### Phase 1 Kickoff Prompt (Suggested)

> "I want to execute Phase 1 (Foundation & Infrastructure) from my modernization master plan. This includes:
> - Migrating to TypeScript
> - Setting up Vitest for testing
> - Configuring ESLint/Prettier/Husky
> - Creating first smoke tests
>
> Please create a detailed implementation plan with specific tasks, file changes, and verification steps."

---

## Appendix

### Useful Resources
- **TypeScript:** https://www.typescriptlang.org/docs/
- **Vitest:** https://vitest.dev/guide/
- **React Testing Library:** https://testing-library.com/docs/react-testing-library/intro/
- **Zod:** https://zod.dev/
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **React Performance:** https://react.dev/learn/render-and-commit

### Repository Structure Reference
```
mtb-maintenance-tracker/
├── src/                    # Source code (to be refactored)
├── docs/                   # SDLC documentation (9 phases)
├── structure-repo/         # Template structure (reference)
├── backup-exports/         # Data backups
├── public/                 # Static assets
└── [config files]          # Build/lint/test configuration
```

---

**End of Master Plan**

*This living document should be updated as phases complete and new insights emerge.*
