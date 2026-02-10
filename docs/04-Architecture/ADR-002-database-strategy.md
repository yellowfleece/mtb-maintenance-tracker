# ADR-002: Database Evolution Strategy

**Date:** 2026-02-10
**Status:** Accepted
**Decision Makers:** Project Owner
**Related Decisions:** [ADR-001 would be first architecture decision]

---

## Context

The MTB Maintenance Tracker currently uses browser `localStorage` for data persistence. While this works for the initial implementation, the application roadmap includes features that require more sophisticated data storage:

1. **Cloud Sync**: Users want to access their bikes from multiple devices
2. **Offline-First**: App should work without internet connection
3. **Larger Datasets**: localStorage has 5-10MB limits
4. **Structured Queries**: Need to efficiently filter and search maintenance records
5. **Real-time Collaboration** (future): Potential for shared bikes or mechanics access

### Current Implementation

**Technology**: Browser `localStorage`

**Data Structure**:
```javascript
// localStorage keys:
- 'bikes': Array<Bike>
- 'maintenanceItems': Array<MaintenanceItem>
- 'configurations': Array<Configuration>
- 'bikeLinks': Array<BikeLink>
- 'openai-api-key': string
- 'data-version': number
```

**Strengths**:
- ✅ Simple API (`localStorage.getItem`, `localStorage.setItem`)
- ✅ Synchronous operations
- ✅ Built into all browsers
- ✅ No server required
- ✅ Privacy-preserving (data stays local)

**Limitations**:
- ❌ 5-10MB storage limit (varies by browser)
- ❌ Synchronous I/O (can block UI with large datasets)
- ❌ No structured queries (must load entire dataset)
- ❌ Device-specific (no sync across devices)
- ❌ Can be cleared by user/browser
- ❌ Key-value only (no relationships or indexes)

---

## Decision

We will adopt a **three-stage database evolution strategy** that progressively enhances data capabilities without disrupting existing functionality:

### Stage 1: localStorage (Current - Phases 1-3)
**Timeline**: Phases 1-3 (Weeks 1-7)
**Status**: ✅ Implemented

Keep existing localStorage implementation during foundation and architecture refactoring phases.

**Rationale**:
- Stable foundation during TypeScript migration
- No data layer complexity during component extraction
- Allows focus on architecture and testing
- Users' data remains safe and accessible

### Stage 2: IndexedDB (Phase 4-5)
**Timeline**: Phases 4-5 (Weeks 8-10)
**Status**: 🔄 Planned

Add IndexedDB support as an **optional upgrade** for users with larger datasets.

**Technology**: IndexedDB (browser-native NoSQL database)

**Benefits**:
- 50MB+ storage (much larger than localStorage)
- Asynchronous API (won't block UI)
- Structured queries with indexes
- Transactional operations
- Still fully local (no server required)

**Implementation Strategy**:
```typescript
// services/storage.ts
interface StorageAdapter {
  getBikes(): Promise<Bike[]>;
  saveBikes(bikes: Bike[]): Promise<void>;
  // ... other methods
}

class LocalStorageAdapter implements StorageAdapter {
  // Current localStorage implementation
}

class IndexedDBAdapter implements StorageAdapter {
  // New IndexedDB implementation
}

// Factory pattern - switch based on user preference or browser support
const storage = useIndexedDB ? new IndexedDBAdapter() : new LocalStorageAdapter();
```

**Migration Path**:
- Auto-detect localStorage data
- Offer one-time migration to IndexedDB
- Keep localStorage as fallback if IndexedDB fails

### Stage 3: Supabase + PostgreSQL (Post-Phase 5)
**Timeline**: Post-modernization (Months 3+)
**Status**: 📋 Future

Add cloud sync via Supabase (open-source Firebase alternative) with PostgreSQL backend.

**Technology**: Supabase (PostgreSQL + real-time sync + authentication)

**Benefits**:
- Multi-device sync
- Cloud backup
- Real-time updates
- Structured relational database
- Row-level security
- Built-in authentication
- 500MB free tier

**Architecture**: Offline-first with cloud sync
```
┌─────────────┐     Sync      ┌──────────────┐
│  IndexedDB  │ ←─────────→  │  Supabase    │
│  (Local)    │   (Optional)  │  PostgreSQL  │
└─────────────┘               └──────────────┘
```

---

## Database Schema Evolution

### Stage 1: localStorage (Current)

**Schema**: Flat JSON arrays

```json
// bikes
[
  {
    "id": "bike-1",
    "name": "Trail Bike",
    "type": "mountain",
    "year": 2022,
    "brand": "Specialized",
    "model": "Stumpjumper",
    "purchaseDate": "2022-03-15",
    "addedDate": "2024-01-01T00:00:00.000Z"
  }
]

// maintenanceItems
[
  {
    "id": "maint-1",
    "bikeId": "bike-1",
    "description": "Chain cleaning",
    "category": "Drivetrain",
    "date": "2024-01-15",
    "status": "completed",
    "priority": "medium",
    "cost": 0,
    "location": "Home",
    "notes": "Used degreaser"
  }
]

// configurations
[
  {
    "bikeId": "bike-1",
    "intervals": {
      "Drivetrain": 14,
      "Brakes": 30,
      "Suspension": 60
    }
  }
]
```

### Stage 2: IndexedDB Schema

**Object Stores**: Same structure as localStorage, but with indexes

```typescript
// IndexedDB Schema
const schema = {
  bikes: {
    keyPath: 'id',
    indexes: [
      { name: 'name', keyPath: 'name' },
      { name: 'type', keyPath: 'type' },
      { name: 'addedDate', keyPath: 'addedDate' }
    ]
  },
  maintenanceItems: {
    keyPath: 'id',
    indexes: [
      { name: 'bikeId', keyPath: 'bikeId' },
      { name: 'category', keyPath: 'category' },
      { name: 'status', keyPath: 'status' },
      { name: 'date', keyPath: 'date' }
    ]
  },
  configurations: {
    keyPath: 'bikeId'
  },
  bikeLinks: {
    keyPath: 'id',
    indexes: [
      { name: 'bikeId', keyPath: 'bikeId' }
    ]
  }
};
```

**Query Examples**:
```typescript
// Fast queries with indexes
const trailBikes = await db.bikes.where('type').equals('mountain').toArray();
const pendingMaintenance = await db.maintenanceItems
  .where('status').equals('pending')
  .and(item => item.bikeId === currentBikeId)
  .toArray();
```

### Stage 3: PostgreSQL Schema (Supabase)

**Relational Schema**: Proper foreign keys and constraints

```sql
-- Bikes table
CREATE TABLE bikes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  year INTEGER,
  brand VARCHAR(100),
  model VARCHAR(100),
  purchase_date DATE,
  added_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE -- Soft delete
);

-- Maintenance items table
CREATE TABLE maintenance_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bike_id UUID NOT NULL REFERENCES bikes(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'in-progress', 'completed')),
  priority VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  cost DECIMAL(10, 2) DEFAULT 0,
  location VARCHAR(200),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configuration table
CREATE TABLE configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bike_id UUID NOT NULL UNIQUE REFERENCES bikes(id) ON DELETE CASCADE,
  intervals JSONB NOT NULL DEFAULT '{}', -- {category: days}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bike links table
CREATE TABLE bike_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bike_id UUID NOT NULL REFERENCES bikes(id) ON DELETE CASCADE,
  label VARCHAR(100) NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_maintenance_bike_id ON maintenance_items(bike_id);
CREATE INDEX idx_maintenance_status ON maintenance_items(status);
CREATE INDEX idx_maintenance_date ON maintenance_items(date DESC);
CREATE INDEX idx_bike_links_bike_id ON bike_links(bike_id);

-- Row-level security (RLS) for multi-tenancy
ALTER TABLE bikes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own bikes"
  ON bikes FOR ALL
  USING (auth.uid() = user_id);

-- Triggers for updated_at timestamps
CREATE TRIGGER update_bikes_updated_at
  BEFORE UPDATE ON bikes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Benefits of Relational Schema**:
- ✅ Foreign key constraints (data integrity)
- ✅ Cascade deletes (delete bike → delete all maintenance)
- ✅ Row-level security (multi-user support)
- ✅ Efficient joins and queries
- ✅ ACID transactions
- ✅ Full-text search capabilities
- ✅ Automatic timestamps

---

## Migration Strategy

### Stage 1 → Stage 2 (localStorage → IndexedDB)

**Migration Code**:
```typescript
// services/migration.ts
async function migrateToIndexedDB() {
  // 1. Read all data from localStorage
  const bikes = JSON.parse(localStorage.getItem('bikes') || '[]');
  const maintenanceItems = JSON.parse(localStorage.getItem('maintenanceItems') || '[]');
  const configurations = JSON.parse(localStorage.getItem('configurations') || '[]');
  const bikeLinks = JSON.parse(localStorage.getItem('bikeLinks') || '[]');

  // 2. Open IndexedDB
  const db = await openDB('mtb-maintenance-tracker', 1);

  // 3. Write data to IndexedDB
  const tx = db.transaction(['bikes', 'maintenanceItems', 'configurations', 'bikeLinks'], 'readwrite');
  await Promise.all([
    ...bikes.map(bike => tx.objectStore('bikes').put(bike)),
    ...maintenanceItems.map(item => tx.objectStore('maintenanceItems').put(item)),
    ...configurations.map(config => tx.objectStore('configurations').put(config)),
    ...bikeLinks.map(link => tx.objectStore('bikeLinks').put(link))
  ]);
  await tx.done;

  // 4. Verify migration
  const verifyCount = await db.count('bikes');
  if (verifyCount !== bikes.length) {
    throw new Error('Migration verification failed');
  }

  // 5. Keep localStorage as backup (for 30 days)
  localStorage.setItem('migration-date', new Date().toISOString());
  localStorage.setItem('migration-backup', 'true');

  // 6. Set preference
  localStorage.setItem('storage-adapter', 'indexeddb');

  return { success: true, recordsMigrated: bikes.length };
}
```

### Stage 2 → Stage 3 (IndexedDB → Supabase)

**Sync Strategy**: Offline-first with eventual consistency

```typescript
// services/sync.ts
class SyncService {
  async syncToCloud() {
    // 1. Get local changes since last sync
    const localChanges = await this.getLocalChanges();

    // 2. Push local changes to Supabase
    const { data: pushedData, error } = await supabase
      .from('bikes')
      .upsert(localChanges.bikes);

    // 3. Pull remote changes
    const { data: remoteChanges } = await supabase
      .from('bikes')
      .select('*')
      .gt('updated_at', lastSyncTimestamp);

    // 4. Merge remote changes into IndexedDB
    await this.mergeRemoteChanges(remoteChanges);

    // 5. Update sync timestamp
    await this.updateSyncTimestamp();
  }

  async resolveConflicts(local, remote) {
    // Last-write-wins strategy (can be customized)
    return local.updated_at > remote.updated_at ? local : remote;
  }
}
```

**Conflict Resolution**: Last-write-wins (future: user-driven resolution)

---

## Technical Considerations

### IndexedDB Libraries

**Option 1: Dexie.js** (Recommended)
- Modern wrapper around IndexedDB
- Promise-based API
- Type-safe (TypeScript support)
- 2KB gzipped
- Active maintenance

```typescript
import Dexie from 'dexie';

class MTBDatabase extends Dexie {
  bikes!: Dexie.Table<Bike, string>;
  maintenanceItems!: Dexie.Table<MaintenanceItem, string>;

  constructor() {
    super('MTBMaintenanceTracker');
    this.version(1).stores({
      bikes: 'id, name, type, addedDate',
      maintenanceItems: 'id, bikeId, category, status, date'
    });
  }
}

export const db = new MTBDatabase();
```

**Option 2: idb** (Lightweight alternative)
- Minimal wrapper (700 bytes)
- Closer to native IndexedDB API
- Less abstraction

**Decision**: Use Dexie.js for better developer experience

### Supabase Integration

**Client Setup**:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

**Real-time Subscriptions**:
```typescript
// Listen for changes to bikes
supabase
  .channel('bikes-changes')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'bikes' },
    (payload) => {
      // Update local IndexedDB with remote change
      updateLocalDatabase(payload.new);
    }
  )
  .subscribe();
```

---

## Risks and Mitigation

### Risk 1: IndexedDB Browser Support
**Mitigation**:
- Check browser support before enabling
- Fallback to localStorage for unsupported browsers
- Display warning for private browsing mode

### Risk 2: Data Loss During Migration
**Mitigation**:
- Keep localStorage backup for 30 days post-migration
- Add "Restore from Backup" feature
- Export data before migration prompt

### Risk 3: Sync Conflicts (Supabase)
**Mitigation**:
- Implement last-write-wins strategy
- Add conflict resolution UI (future)
- Keep local version as backup

### Risk 4: Supabase Costs
**Mitigation**:
- Free tier supports 500MB + 50K monthly active users
- Monitor usage with alerts
- Offer self-hosted option for advanced users

### Risk 5: Network Failures (Supabase)
**Mitigation**:
- Offline-first architecture (IndexedDB primary)
- Queue failed syncs for retry
- Display sync status indicator

---

## Performance Considerations

### localStorage Performance
- **Read**: ~1ms for small datasets
- **Write**: ~5ms for small datasets
- **Limit**: Degrades with datasets >1MB

### IndexedDB Performance
- **Read**: ~5ms (asynchronous, non-blocking)
- **Write**: ~10ms (transactional)
- **Limit**: Can handle 50MB+ efficiently

### Supabase Performance
- **Read**: ~100-300ms (network latency)
- **Write**: ~100-300ms (network latency)
- **Real-time**: ~50ms (WebSocket updates)

**Optimization Strategy**: IndexedDB serves as fast local cache, Supabase syncs in background

---

## Success Criteria

### Stage 1 (localStorage)
- ✅ Current implementation working
- ✅ No data loss
- ✅ Fast operations (<10ms)

### Stage 2 (IndexedDB)
- ✅ Successful migration from localStorage
- ✅ All queries use indexes (fast lookups)
- ✅ Support for 100+ bikes and 1000+ maintenance items
- ✅ Zero localStorage quota errors

### Stage 3 (Supabase)
- ✅ Multi-device sync working
- ✅ Offline-first (app works without internet)
- ✅ Sync conflicts resolved gracefully
- ✅ Sub-5-second sync times
- ✅ Row-level security protecting user data

---

## Future Enhancements

### Stage 4 (Potential)
- **PostgreSQL Extensions**: Full-text search with `pg_trgm`
- **TimescaleDB**: Time-series analysis for maintenance trends
- **PostGIS**: GPS tracking for ride locations
- **GraphQL**: More efficient data fetching via Supabase
- **Edge Functions**: Serverless backend logic (e.g., maintenance reminders)

---

## Decision Rationale

### Why This Approach?

1. **Incremental Risk**: Each stage is optional and reversible
2. **User Choice**: Users can stay on localStorage if desired
3. **Privacy-First**: Local storage remains an option
4. **Performance**: Appropriate technology for each scale
5. **Future-Proof**: Clear path to multi-device sync

### Alternatives Considered

#### Alternative 1: Firebase
**Pros**: Popular, well-documented
**Cons**: Proprietary, expensive at scale, vendor lock-in
**Decision**: Rejected in favor of open-source Supabase

#### Alternative 2: PouchDB + CouchDB
**Pros**: Excellent offline-first, mature
**Cons**: Steeper learning curve, less active development
**Decision**: Rejected in favor of PostgreSQL's structure

#### Alternative 3: Skip IndexedDB, go straight to Supabase
**Pros**: Simpler migration path
**Cons**: Requires internet, higher barrier to entry, users lose local-only option
**Decision**: Rejected to preserve privacy-first approach

---

## Implementation Timeline

- **Phase 1-3** (Weeks 1-7): Keep localStorage, no changes
- **Phase 4** (Week 8): Design IndexedDB schema, build adapters
- **Phase 5** (Weeks 9-10): Implement migration, test with real data
- **Post-Modernization** (Month 3+): Supabase integration planning
- **Post-Modernization** (Month 4+): Supabase implementation and beta testing

---

## References

- [IndexedDB API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Dexie.js Documentation](https://dexie.org/)
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Best Practices](https://www.postgresql.org/docs/current/index.html)
- [Offline-First Architecture Patterns](https://offlinefirst.org/)

---

**Decision Date:** 2026-02-10
**Review Date:** Post-Phase 3 (before IndexedDB implementation)
**Status:** ✅ Accepted
**Supersedes:** N/A (first database architecture decision)
