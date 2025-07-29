# Organic Flow: Knowledge Types Guide

*Created: 2025-07-29*
*Context: Understanding the different types of knowledge in Organic Flow and where they belong*

## The Harvest Process and Knowledge Types

In Organic Flow, **harvest** is the verb - the action of extracting value from experiments through Knowledge PRs. This process produces different types of knowledge artifacts (nouns) that live in specific directories.

Think of it like actual harvesting: you gather the crop (run experiment), then sort it into different bins (knowledge types) based on what you've found.

## The Knowledge Types

### 1. Inputs - Starting Points
**Directory**: `inputs/`
**Subdirectories**: `problems/`, `ideas/`, `observations/`

**What belongs here**: The sparks that initiate work
- **Problems**: Issues that need solving
- **Ideas**: "What if we tried..." thoughts  
- **Observations**: Patterns or behaviors noticed

**Examples**:
```markdown
# inputs/problems/slow-search.md
Users report search takes 5-10 seconds, causing frustration

# inputs/ideas/redis-caching.md
What if we cached frequent searches in Redis?

# inputs/observations/lunch-rush-pattern.md
System slows down every day between 11:30am-1pm
```

### 2. Assumptions - Hypotheses to Test
**Directory**: `assumptions/`

**What belongs here**: Beliefs about what might work
- Testable hypotheses
- Proposed solutions with expected outcomes
- Must be validated through experiments

**Examples**:
```markdown
# assumptions/redis-cache-performance.md
If we implement Redis caching for search results,
then search response time will drop below 500ms,
assuming cache hit rate > 80%.
```

### 3. Specifications - Validated Requirements
**Directory**: `specifications/`

**What belongs here**: Proven requirements with evidence
- Assumptions that experiments validated
- Requirements backed by real-world testing
- Constraints that must be respected

**Examples**:
```markdown
# specifications/search-performance-requirement.md
Search must return results in <500ms for 95% of queries.
Validated through experiment/redis-cache showing 200ms p95.
```

### 4. Learnings - Specific Discoveries
**Directory**: `learnings/`

**What belongs here**: Concrete insights from experiments
- Specific, measurable discoveries
- "We tried X and Y happened"
- Particular limits or constraints found

**Examples**:
```markdown
# learnings/redis-connection-limits.md
Discovered Redis connection pool exhausts at exactly 10,000 connections
due to server file descriptor limits.

# learnings/user-session-behavior.md
90% of users have sessions lasting less than 1 hour,
making 4-hour timeout unnecessary.
```

### 5. Patterns - Reusable Solutions
**Directory**: `patterns/`

**What belongs here**: Abstracted, reusable approaches
- Solutions that work across contexts
- Generalizable strategies
- "When you see X, do Y"

**Examples**:
```markdown
# patterns/cache-warming-strategy.md
## Pattern: Cache Warming for Predictable Load

When you have predictable traffic spikes:
1. Pre-load cache 30 minutes before spike
2. Use traffic patterns from last 7 days
3. Refresh most-accessed items first

Applies to: Any caching layer with predictable usage
```

### 6. Knowledge - Deep Understanding
**Directory**: `knowledge/`

**What belongs here**: Synthesized insights and frameworks
- Conceptual understanding across experiments
- The "why" behind patterns
- Mental models and frameworks

**Examples**:
```markdown
# knowledge/caching-philosophy.md
Caching is not about storing everything - it's about predicting
what will be needed. The value comes from understanding access patterns,
not from cache size.

# knowledge/implementation-spectrum.md
There's a spectrum from pure knowledge to pure implementation...
[deeper exploration of the concept]
```

## How Harvest Feeds These Types

When you complete an experiment and create a Knowledge PR (harvest), you might:

1. **Extract specific discoveries** → `learnings/`
   - "Redis uses 100KB per connection"
   - "Search indexing takes 3ms per document"

2. **Identify reusable solutions** → `patterns/`
   - "Use connection pooling for any external service"
   - "Implement circuit breakers for fault tolerance"

3. **Validate or invalidate assumptions** → Update `assumptions/`
   - Mark as validated/invalidated
   - Add evidence from experiment

4. **Discover new problems** → `inputs/problems/`
   - "Memory usage scales poorly"
   - "Need monitoring for connection pools"

5. **Confirm requirements** → `specifications/`
   - "System must handle 10k concurrent users"
   - "Response time must be <500ms"

6. **Synthesize understanding** → `knowledge/`
   - "Why caching strategies succeed or fail"
   - "How to think about system scaling"

## Decision Guide: Where Does This Belong?

Ask yourself:

1. **Is this a starting point for work?** → `inputs/`
2. **Is this something we believe might work?** → `assumptions/`
3. **Is this a proven requirement?** → `specifications/`
4. **Is this a specific discovery from an experiment?** → `learnings/`
5. **Is this a reusable solution pattern?** → `patterns/`
6. **Is this deep conceptual understanding?** → `knowledge/`

## The Knowledge Flow

```
inputs → assumptions → experiments → HARVEST →
    ↓                                    ↓
    ↓                          ┌─────────┴─────────┐
    ↓                          ↓         ↓         ↓
    ↓                     learnings  patterns  knowledge
    ↓                          ↓         ↓         ↓
    ↓                          └─────────┬─────────┘
    ↓                                    ↓
    └──────← new inputs ←────── specifications
```

## Examples from a Single Harvest

Here's what a harvest from a caching experiment might produce:

**New Learning**:
```markdown
# learnings/redis-memory-formula.md
Redis memory usage = (connection_count * 100KB) + (cache_size * 1.5)
```

**New Pattern**:
```markdown
# patterns/tiered-caching.md
Use hot/warm/cold tiers for large datasets:
- Hot: In-memory (last 5 min)
- Warm: Redis (last hour)  
- Cold: Database (everything else)
```

**Updated Assumption**:
```markdown
# assumptions/simple-caching.md
Status: INVALIDATED
Evidence: experiment/redis-cache showed memory constraints at scale
```

**New Input**:
```markdown
# inputs/problems/cache-memory-scaling.md
Redis caching works but uses too much memory at scale
```

**New Specification**:
```markdown
# specifications/cache-memory-limits.md
Cache solution must work within 8GB memory constraint
Validated by: experiment/redis-cache failure at 10GB
```

## Best Practices

1. **Be Specific in Learnings**: Include numbers, limits, formulas
2. **Abstract Patterns**: Remove implementation details, focus on approach
3. **Link Artifacts**: Reference which experiment produced which knowledge
4. **Update Existing**: Don't just create new files, update assumptions and specifications
5. **Think Reusability**: Will this help future experiments?

Remember: Harvest is the process that transforms experimental results into organized, reusable knowledge. The better your harvest, the more your knowledge compounds over time.