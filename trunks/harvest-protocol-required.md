---
type: trunk
id: harvest-protocol-required
title: "Knowledge extraction must follow a structured harvest protocol"
validated_roots:
  - failed-experiments-valuable
  - knowledge-eternal-code-temporary
  - documentation-drives-development
priority: P0
status: validated
evidence:
  - "Unstructured knowledge extraction loses 80% of insights"
  - "Structured harvests produce reusable patterns"
  - "Teams that harvest regularly innovate faster"
---

# Requirement: Harvest Protocol

## The Harvest Mandate

Every experiment, whether successful or failed, must undergo a structured knowledge harvest before closure. No exceptions.

## The Harvest Protocol

### Step 1: Create Harvest Branch
```bash
# From main branch
git checkout -b harvest/[experiment-name]-insights

# Create harvest structure
mkdir -p knowledge/harvests/[year]/[month]
```

### Step 2: Extract Technical Learnings
Document specific technical discoveries:

```markdown
# knowledge/harvests/2025/01/redis-session-insights.md

## Technical Discoveries

### What Worked
- Redis SET/GET operations: <1ms latency
- Lua scripts for atomic operations
- Connection pooling configuration

### What Didn't Work  
- Redis Cluster: too complex for benefit
- Persistence: slowed operations 3x
- Large session objects: memory bloat

### Specific Limits Found
- Max concurrent connections: 10,000
- Memory per session: 2KB average
- Total memory needed: ~20GB for peak
```

### Step 3: Validate or Invalidate Roots
Update assumptions based on evidence:

```markdown
# roots/session-storage-assumptions.md

## Update: 2025-01-21

### Assumption: "Redis eliminates session bottlenecks"
**Status**: PARTIALLY VALIDATED
- ✓ Eliminates lookup bottlenecks
- ✗ Creates memory bottlenecks
- ✓ Reduces database load

**Evidence**: experiment/session-redis results
```

### Step 4: Discover New Seeds
Document new problems uncovered:

```markdown
# seeds/session-memory-scaling.md

## Problem: Session Storage Memory Scaling
**Discovered**: During Redis session experiment
**Evidence**: Hit 20GB memory limit at 10k users
**Impact**: Blocks scaling beyond 10k concurrent users

Current workarounds:
- Restart servers nightly
- Manually clear old sessions
- Limit session data size
```

### Step 5: Create Reusable Patterns
Abstract learnings into patterns:

```markdown
# knowledge/patterns/hybrid-session-storage.md

## Pattern: Hybrid Session Storage

### Context
When you need fast session access but have memory constraints

### Solution
- Hot sessions in Redis (last 30 min)
- Warm sessions in database (last 24h)
- Cold sessions in S3 (older)

### Implementation
[Code example from experiment]

### Trade-offs
- Complexity for scalability
- 3 systems to maintain
- Occasional cache misses
```

### Step 6: Update Implementation Registry
Record the experiment outcome:

```yaml
# implementations.yaml
- id: session-redis
  status: completed
  outcome: partial-success
  harvest:
    pr: #47
    date: 2025-01-21
    insights_count: 7
    patterns_created: 2
    roots_updated: 3
    new_seeds: 1
```

## Harvest Quality Standards

### Completeness Checklist
- [ ] Technical learnings documented
- [ ] Roots validated/invalidated with evidence
- [ ] New seeds discovered and documented
- [ ] Patterns abstracted from specifics
- [ ] Implementation registry updated
- [ ] Links between artifacts created

### Specificity Requirements
❌ **Bad**: "Redis didn't work well"
✅ **Good**: "Redis hit 10k connection limit with default config"

❌ **Bad**: "Performance was poor"
✅ **Good**: "Response time degraded from 50ms to 800ms at 5k users"

❌ **Bad**: "Architecture too complex"
✅ **Good**: "Required 3 additional services and 2 FTEs to maintain"

### Actionability Standards
Each insight should enable decisions:

**Non-actionable**: "Caching helps performance"
**Actionable**: "Redis caching reduces p95 latency by 70% for <10k users"

**Non-actionable**: "Microservices are complex"
**Actionable**: "Each microservice adds ~20ms latency and $500/mo ops cost"

## Harvest Timing

### Immediate Harvest (Within 48 hours)
- Experiment completed successfully
- Experiment explicitly abandoned
- Major insight discovered

### Deadline Harvest (Within 7 days)
- Experiment naturally concluded
- Team moving to new work
- End of sprint/cycle

### Emergency Harvest (Same day)
- Critical failure discovered
- Security issue found
- Blocking other teams

## Harvest Review Process

### Self-Review Questions
1. Could someone recreate our experiment from this?
2. Would this prevent others from repeating our mistakes?
3. Are the patterns general enough to reuse?
4. Is the evidence specific and measurable?

### Peer Review Focus
- Clarity of insights
- Completeness of extraction
- Quality of patterns
- Accuracy of root updates

### Merge Criteria
- All sections completed
- Evidence provided
- Patterns abstracted
- Registry updated

## Benefits of Structured Harvest

### Knowledge Compounds
Each harvest builds on previous:
- Patterns reference other patterns
- Seeds connect to form themes
- Roots evolve with evidence
- Understanding deepens

### Failure Becomes Valuable
Failed experiments often produce more insights:
- More constraints discovered
- More assumptions invalidated
- More questions raised
- More patterns identified

### Innovation Accelerates
With good harvests:
- Teams avoid known dead ends
- Build on proven patterns
- Start from higher baseline
- Explore new territory

## Enforcement and Support

### Tooling
```bash
# Harvest assistant
sprout-flow harvest start session-redis
sprout-flow harvest validate
sprout-flow harvest submit
```

### Templates
Provide templates for:
- Technical insights
- Pattern documentation
- Root updates
- Seed discovery

### Metrics
Track harvest quality:
- Insights per experiment
- Pattern reuse rate
- Time to harvest
- Review iterations

## Success Validation

✅ **Structured process**: Clear steps defined
✅ **Quality standards**: Specific and actionable
✅ **Timing requirements**: Prevents knowledge loss
✅ **Tool support**: Assists without constraining

## Related Trunks
- [experiment-branch-lifecycle](experiment-branch-lifecycle.md)
- [knowledge-accumulation-metrics](knowledge-accumulation-metrics.md)
- [pattern-library-structure](pattern-library-structure.md)