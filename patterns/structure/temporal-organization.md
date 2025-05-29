# Temporal Organization Pattern

## Intent
Use time-based organization to preserve context, enable reconstruction of events, and maintain truth about when and how knowledge evolved.

## Motivation
Traditional organization by category loses temporal context:
- Can't see evolution of thinking
- Don't know what influenced what
- Lose sense of progression
- Can't reconstruct sequences
- Knowledge seems static

Temporal organization preserves:
- Order of discoveries
- Evolution of understanding
- Influence relationships
- Natural progressions
- Living knowledge

## Structure
```
# Primary: Timestamp prefixes
docs/unprocessed/
├── 2025-01-27-initial-api-thoughts.md
├── 2025-01-28-api-research.md
├── 2025-01-29-morning-api-breakthrough.md
├── 2025-01-29-afternoon-api-refinement.md
└── 2025-01-30-api-final-design.md

# Secondary: Archive by date
implementation/sessions/
├── 2025-01-29-morning/
├── 2025-01-29-afternoon/
└── 2025-01-30/

# Git branches include dates
flow/2025-01-29-api-exploration
impl/2025-01-30-api-build
```

## Implementation

### 1. Timestamp Naming Convention
```bash
# Basic format: YYYY-MM-DD-description
docs/unprocessed/2025-01-29-auth-insight.md

# With time when needed: YYYY-MM-DD-HHMMSS-description  
docs/unprocessed/2025-01-29-143022-critical-bug-fix.md

# Multiple same day: YYYY-MM-DD-qualifier-description
docs/unprocessed/2025-01-29-morning-standup.md
docs/unprocessed/2025-01-29-afternoon-discovery.md
```

### 2. Content Timestamps
```markdown
# Authentication Decision
*Captured: 2025-01-29 14:30:22 UTC*
*Session: flow/2025-01-29-auth-exploration*
*Duration: 2.5 hours*

[Content...]

*Updated: 2025-01-29 16:45:00 UTC*
*Note: Added refresh token details*
```

### 3. Session-Based Directories
```bash
# Implementation sessions by date
implementation/sessions/2025-01-29-auth/
├── context.md           # When/why this session
├── knowledge-used.md    # What informed this
├── decisions-made.md    # What we decided
└── generated/          # What we built

# Flow archives by date
.flow/archives/2025-01-29/
├── morning/            # Morning exploration
└── afternoon/          # Afternoon refinement
```

### 4. Chronological Reading
```bash
# Read evolution of understanding
ls docs/unprocessed/*api* | sort | while read f; do
  echo "=== $f ==="
  head -20 "$f"
done

# See progression:
# 2025-01-27: "REST API is getting complex"
# 2025-01-28: "Researched GraphQL as option"
# 2025-01-29: "GraphQL solves our problems!"
# 2025-01-30: "Final GraphQL schema design"
```

### 5. Time-Based Queries
```bash
# What did we learn this week?
find docs/unprocessed -name "2025-01-2[5-9]*" -o -name "2025-01-3[0-1]*"

# Morning insights vs afternoon insights
ls docs/unprocessed/*morning* 
ls docs/unprocessed/*afternoon*

# Evolution of specific topic
grep -l "authentication" docs/unprocessed/* | sort
```

## Examples

### Daily Knowledge Evolution
```
Monday (2025-01-27):
- 2025-01-27-sprint-planning.md
- 2025-01-27-auth-initial-thoughts.md

Tuesday (2025-01-28):
- 2025-01-28-morning-auth-research.md
- 2025-01-28-jwt-discovery.md
- 2025-01-28-team-sync-auth.md

Wednesday (2025-01-29):
- 2025-01-29-auth-breakthrough.md
- 2025-01-29-refresh-token-pattern.md
- 2025-01-29-auth-decision-final.md

Clear progression from exploration to decision
```

### Debugging with Temporal Context
```bash
# Bug appeared after deployment
# When did we change auth logic?

ls implementation/sessions/*/auth* | sort
# 2025-01-25-auth-basic/
# 2025-01-29-auth-jwt/     <- Recent change
# 2025-01-30-auth-fix/

# What changed on the 29th?
cat implementation/sessions/2025-01-29-auth-jwt/context.md
# "Switched from sessions to JWT"
# Found it!
```

### Knowledge Archaeology
```bash
# "Why did we choose PostgreSQL over MongoDB?"
grep -r "postgres\|mongodb" docs/unprocessed/ | sort

# Results show evolution:
# 2025-01-15: "MongoDB for flexibility"
# 2025-01-18: "Consistency concerns with MongoDB"  
# 2025-01-20: "PostgreSQL JSONB gives both"
# 2025-01-22: "Decision: PostgreSQL"
```

## Consequences

### Benefits
- **Evolution visible**: See how understanding grew
- **Context preserved**: Know what influenced decisions
- **Debugging aid**: Find when changes occurred
- **Pattern recognition**: Spot temporal patterns
- **Truth maintenance**: Can't dispute timestamps

### Considerations
- Requires timestamp discipline
- File lists can get long
- Need good search tools
- Timezone consistency important
- May need periodic archiving

### Best Practices
1. **Always timestamp**: No exceptions
2. **Use UTC**: Avoid timezone confusion
3. **Be specific**: Include time when relevant
4. **Sort naturally**: Use YYYY-MM-DD format
5. **Archive old**: Move ancient history periodically

### Anti-patterns
- Updating files without noting when
- Generic names like "notes.md"
- Category folders that hide time
- Renaming files and losing dates
- Forgetting timezone notation

## Related Patterns
- [Temporal Integrity](../core/temporal-integrity.md) - Why time matters
- [Unprocessed Directory](unprocessed-directory.md) - Temporal accumulation
- [Weather Protocol](../protocols/weather-protocol.md) - Current time state
- [Archive Strategy](archive-strategy.md) - Long-term temporal storage