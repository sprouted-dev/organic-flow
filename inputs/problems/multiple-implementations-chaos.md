---
type: seed
id: multiple-implementations-chaos
problem: "Multiple implementations of the same system create operational chaos"
discovered: 2025-01-21
status: validated
evidence:
  - source: "OXGN Project audit"
    description: "Found oxgn-be, oxgn-fe, oxgn-mobile, oxgn-mvp, oxgn-ios, oxgn-astro, and more"
  - source: "Developer interviews"
    description: "Which repo is the real one? Why do we have 3 payment systems?"
  - source: "Security audit"
    description: "Critical updates missed in 'forgotten' implementations still in production"
impact:
  severity: critical
  scope: "Any team that experiments"
  cost: "Security vulnerabilities, customer data inconsistencies, wasted effort"
---

# Problem: Multiple Implementations Chaos

## The Proliferation Problem

When teams experiment with different technical approaches, they naturally create multiple implementations. This is healthy - experimentation drives innovation. But without proper tracking and governance, these experiments create chaos.

## Real-World Manifestations

### The "Which Repo?" Question
Every developer who's joined an established team knows this conversation:
- "Is the API in oxgn-be or oxgn-api?"
- "We use oxgn-mvp now, ignore the others"
- "Actually, the mobile team still uses oxgn-be..."
- "Wait, there's also oxgn-platform?"

### The Zombie Systems
Implementations that should be dead but aren't:
- Old payment system still processing some customers
- Deprecated API still serving the mobile app
- "Legacy" authentication used by one important integration
- Multiple databases with slightly different schemas

### The Divergence Problem
Each implementation evolves separately:
- Bug fixed in one system but not others
- Features added inconsistently
- Security updates applied unevenly
- Data models drift apart

## Evidence from OXGN

Our audit revealed:
```
~/clients/oxgn/
├── oxgn-be/          # "Original" backend (still used by mobile?)
├── oxgn-fe/          # "Original" frontend (deprecated?)
├── oxgn-mobile/      # React Native attempt (abandoned?)
├── oxgn-mvp/         # Current main development
├── oxgn-ios/         # Native iOS (prototype?)
├── oxgn-astro/       # Static site experiment
├── oxgn-api/         # New API (replacing oxgn-be?)
└── oxgn-platform/    # Unified platform (future?)
```

Each represents significant effort, but there's no clear:
- Registry of what each does
- Status (active, deprecated, experimental)
- Relationship between them
- Migration path

## The Hidden Costs

### Security Vulnerabilities
- Old implementations with known vulnerabilities still running
- No central place to track what needs updates
- Forgotten systems become attack vectors

### Data Integrity
- Customer data spread across multiple databases
- Synchronization issues between systems
- No single source of truth

### Developer Productivity
- Time wasted working in wrong repository
- Features implemented multiple times
- Confusion about where to make changes

### Customer Experience
- Inconsistent behavior across platforms
- Features available in some interfaces but not others
- Data changes not reflected everywhere

## Why Traditional Approaches Fail

### Monorepo "Solutions"
- Still doesn't track experimental vs production
- History becomes cluttered with failed attempts
- No clear way to archive experiments

### Documentation Wikis
- Quickly outdated
- No connection to actual code
- Nobody updates when creating new experiments

### Naming Conventions
- "v2", "new", "next", "platform" lose meaning
- Still no lifecycle tracking
- Doesn't solve registry problem

## The Experimentation Paradox

We want teams to experiment - it's how we innovate. But we also need:
- Clear tracking of all experiments
- Explicit lifecycle (experiment → production → archived)
- Knowledge extraction from all attempts
- One source of truth about what's current

Without solving this, teams either:
1. Stop experimenting (stagnation)
2. Create chaos (our current state)

## Related Seeds
- [lost-learning-from-failures](lost-learning-from-failures.md)
- [experiment-lifecycle-tracking](experiment-lifecycle-tracking.md)
- [implementation-registry-need](implementation-registry-need.md)