# Decision Log
## MTB Maintenance Tracker Modernization

This document tracks key decisions made during the modernization project.

---

## Decision #1: Documentation Integration with SDLC Structure
**Date:** 2026-02-10
**Status:** Accepted
**Decision Makers:** Project Owner

### Context
The project has an established 9-phase SDLC folder structure (`01-Discovery` through `09-Archive`), but modernization planning documents need a clear home.

### Decision
Create a new `00-Planning/` folder to house strategic planning documents while maintaining the existing SDLC structure for phase-specific artifacts.

### Rationale
- **Separation of Concerns**: Strategic planning (master plans, decision logs) is distinct from phase-specific SDLC artifacts
- **Chronological Ordering**: `00-Planning/` naturally precedes `01-Discovery/` in folder listings
- **Backward Compatibility**: Preserves existing SDLC structure without disruption
- **Findability**: Centralized location for all modernization planning documents

### Consequences
- **Positive**: Clear home for master plans, decision logs, and roadmaps
- **Positive**: Easy to reference across all phases
- **Neutral**: Adds one more top-level folder to docs/
- **Negative**: None identified

---

## Decision #2: Database Evolution Path (localStorage → IndexedDB → Supabase)
**Date:** 2026-02-10
**Status:** Accepted
**Decision Makers:** Project Owner

### Context
Current implementation uses localStorage for data persistence. For modernization, we need a strategy that:
1. Maintains existing functionality
2. Enables future cloud sync and multi-device support
3. Provides a clear migration path

### Decision
Adopt a three-stage database evolution strategy:
1. **Phase 1-3**: Keep localStorage (stable foundation)
2. **Phase 4-5**: Add IndexedDB support (optional, better local storage)
3. **Post-Phase 5**: Migrate to Supabase (cloud sync, PostgreSQL backend)

### Rationale
- **Risk Mitigation**: Defer complex data layer changes until after TypeScript migration and testing infrastructure is in place
- **Incremental Complexity**: Each step adds value without disrupting existing functionality
- **Future-Proof**: Supabase provides PostgreSQL, real-time sync, and authentication out of the box
- **Developer Experience**: IndexedDB offers better local storage (structured queries, larger capacity) before cloud migration

### Technical Details
- **localStorage** (current): Simple key-value storage, 5-10MB limit
- **IndexedDB** (Phase 5): NoSQL database in browser, 50MB+ limit, structured queries
- **Supabase** (future): PostgreSQL, real-time sync, row-level security, 500MB free tier

### Migration Strategy
- Phase 1-3: No data layer changes
- Phase 4-5: Create abstraction layer (`services/storage.ts`) that can swap between localStorage/IndexedDB
- Post-Phase 5: Add Supabase integration with offline-first architecture

### Consequences
- **Positive**: Stable foundation during early refactoring phases
- **Positive**: Clear migration path to cloud sync
- **Positive**: Each step adds value independently
- **Neutral**: Requires building storage abstraction layer
- **Negative**: Delays cloud sync features to post-modernization phases

---

## Decision #3: GitHub Issues Reorganization Approach
**Date:** 2026-02-10
**Status:** Accepted
**Decision Makers:** Project Owner

### Context
Current GitHub issues (#1-6) represent legacy features and technical debt. The modernization effort requires structured issue tracking across 5 phases with clear milestones.

### Decision
Reorganize GitHub issues using:
1. **5 Milestones**: One per modernization phase (Foundation, Architecture, Security, Performance, Features)
2. **Semantic Labels**: `phase-1` through `phase-5`, `modernization`, `technical-debt`, `security`, `accessibility`, `legacy-feature`
3. **New Issues**: Create issues #7-26 for modernization tasks
4. **Master Tracker**: Create issue #27 as master tracking issue linking to all phases
5. **Update Legacy Issues**: Retroactively assign labels and milestones to issues #1-6

### Rationale
- **Clarity**: Milestones provide clear progress tracking for each phase
- **Filtering**: Labels enable filtering by phase, type, or concern area
- **Accountability**: Each issue tied to specific phase deliverables
- **Visibility**: Master tracking issue provides single source of truth for modernization progress

### Label Strategy
- **Phase Labels** (`phase-1` to `phase-5`): Tie issues to specific modernization phases
- **Type Labels** (`modernization`, `legacy-feature`, `technical-debt`): Categorize issue purpose
- **Concern Labels** (`security`, `accessibility`, `performance`): Highlight cross-cutting concerns

### Consequences
- **Positive**: Clear project roadmap visible in GitHub
- **Positive**: Easy to filter and track progress by phase
- **Positive**: Establishes pattern for future issue management
- **Neutral**: Requires initial setup time to create 20+ issues
- **Negative**: None identified

---

## Decision Template

### Decision #X: [Title]
**Date:** YYYY-MM-DD
**Status:** [Proposed | Accepted | Deprecated | Superseded]
**Decision Makers:** [Names/Roles]

#### Context
[What is the issue we're facing? What factors are driving this decision?]

#### Decision
[What is the change we're making?]

#### Rationale
[Why did we choose this option? What are the key factors?]

#### Consequences
- **Positive**: [Benefits]
- **Neutral**: [Trade-offs]
- **Negative**: [Drawbacks]

---

**Last Updated:** 2026-02-10
