# Unprocessed Directory Pattern

## Intent
Create a single, sacred location where all knowledge accumulates naturally without premature organization, forming the regenerative source for all future work.

## Motivation
Traditional documentation approaches:
- Require immediate organization
- Force premature categorization
- Create barriers to capture
- Lose context in structure
- Discourage quick notes

The unprocessed directory:
- Removes all barriers to knowledge capture
- Preserves everything in one place
- Allows patterns to emerge naturally
- Becomes the single source of truth
- Enables complete regeneration

As discovered: "Our unprocessed directory is turning into the gold mine, if we had nothing else but that, we could rebuild :)"

## Structure
```
docs/unprocessed/
├── 2025-01-27-initial-thoughts.md
├── 2025-01-28-auth-exploration.md
├── 2025-01-29-jwt-decision.md
├── 2025-01-29-performance-insight.md
├── 2025-01-30-api-patterns.md
├── 2025-01-30-team-discussion.md
└── 2025-01-31-weekly-learnings.md

# Simple: timestamp + descriptive name
# No subdirectories, no categories
# Just accumulation
```

## Implementation

### 1. Create the Directory
```bash
mkdir -p docs/unprocessed
echo "# Unprocessed Knowledge" > docs/unprocessed/README.md
echo "Raw insights accumulate here. Don't organize prematurely." >> docs/unprocessed/README.md
```

### 2. Harvest to Unprocessed
```bash
# After flow session
cat > docs/unprocessed/$(date +%Y-%m-%d)-auth-insights.md << EOF
# Authentication Insights
*Harvested from: flow/auth-exploration*
*Date: $(date -u +"%Y-%m-%d %H:%M:%S UTC")*

## Key Discoveries
- JWT solves our stateless needs
- Refresh rotation prevents hijacking
- 15-minute tokens balance security/UX

## Decisions Made
- Use RS256 signing
- Implement refresh rotation
- Store refresh tokens securely

## Still Exploring
- Revocation strategies
- Device tracking benefits
EOF
```

### 3. Natural Accumulation
```bash
# Quick insight during work
echo "# Quick Realization: $(date +%Y-%m-%d)" > \
  docs/unprocessed/$(date +%Y-%m-%d)-cache-insight.md
echo "Redis pub/sub could solve our cache invalidation!" >> \
  docs/unprocessed/$(date +%Y-%m-%d)-cache-insight.md

# Team discussion notes
echo "# Team Discussion Notes" > \
  docs/unprocessed/$(date +%Y-%m-%d)-team-sync.md
echo "Sarah suggested GraphQL for the API redesign" >> \
  docs/unprocessed/$(date +%Y-%m-%d)-team-sync.md
```

### 4. Let Patterns Emerge
```bash
# After a month, patterns become visible
ls docs/unprocessed/ | grep auth
# 2025-01-15-auth-research.md
# 2025-01-18-auth-spike.md
# 2025-01-22-auth-decision.md
# 2025-01-29-auth-implementation.md

# Natural evolution visible through naming
```

### 5. Reference for Regeneration
```markdown
# When implementing auth
"Check docs/unprocessed/*auth* for all our auth thinking"

# When explaining decisions
"See docs/unprocessed/2025-01-29-jwt-decision.md"

# When onboarding someone
"Read through docs/unprocessed/ chronologically"
```

## Examples

### The 3-Kit Regeneration
Starting state:
- Code structure was broken
- No working implementation
- Only docs/unprocessed/ intact

From unprocessed knowledge:
- Regenerated Garden Kit (prescriptive)
- Regenerated Starter Kit (adaptive)
- Regenerated Dev Kit (multi-agent)
- Each better than the original

### Daily Knowledge Capture
```bash
# Morning shower thought
echo "What if we used event sourcing?" > \
  docs/unprocessed/$(date +%Y-%m-%d)-event-sourcing-idea.md

# Debugging discovery
echo "# Bug Root Cause: Race Condition" > \
  docs/unprocessed/$(date +%Y-%m-%d)-race-condition-fix.md
echo "setTimeout was masking the real issue" >> \
  docs/unprocessed/$(date +%Y-%m-%d)-race-condition-fix.md

# Architecture insight
echo "# Microservices Might Be Overkill" > \
  docs/unprocessed/$(date +%Y-%m-%d)-architecture-rethink.md
```

### Knowledge Evolution Visible
```bash
# See how thinking evolved
grep -l "authentication" docs/unprocessed/* | sort
# Shows journey from first thoughts to final decision
```

## Consequences

### Benefits
- **Zero friction**: No barriers to capture
- **Complete history**: Everything preserved
- **Pattern emergence**: Themes become visible
- **Regeneration source**: Can rebuild anything
- **Knowledge compounds**: Each insight builds

### Considerations
- Can grow large (that's good!)
- Needs periodic pattern extraction
- Resist urge to organize prematurely  
- Search becomes important (use grep)
- Timestamp discipline crucial

### Signs of Healthy Unprocessed Directory
- New files daily
- Mix of big and small insights
- Natural theme clusters
- Referenced often in code
- Team contributes regularly

### Anti-patterns to Avoid
- Creating subdirectories
- Moving files out
- Deleting "old" content
- Over-organizing
- Judging quality

### The Sacred Rule
**Never delete from unprocessed. Only add.**

Even "wrong" insights teach us something. The directory is append-only.

## Related Patterns
- [Knowledge First](../core/knowledge-first.md) - Why this matters
- [Harvest Protocol](../workflow/harvest-protocol.md) - How content arrives
- [Regeneration](../core/regeneration.md) - Using the goldmine
- [Temporal Integrity](../core/temporal-integrity.md) - Timestamp everything