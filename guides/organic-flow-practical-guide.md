# Organic Flow: Practical Guide

*Created: 2025-07-29*
*Context: Step-by-step guide for implementing Organic Flow manually*

## Quick Start

You can start using Organic Flow today with just Git and markdown. No special tools required.

## Setting Up Your Repository

### Step 1: Create the Knowledge Structure
```bash
# In your main branch
mkdir -p knowledge/{inputs,hypotheses,learnings,patterns,constraints}
mkdir -p knowledge/inputs/{problems,ideas,observations}

# Create the experiments registry
echo "# Experiments Registry" > experiments.yaml
echo "experiments: []" >> experiments.yaml

# Prevent code in main branch
cat > .gitignore << 'EOF'
# Block all code files in main
*.js *.ts *.py *.go *.java *.rb *.php *.rs
*.c *.cpp *.h *.hpp *.cs *.swift *.kt
/src /lib /bin /build /dist
package.json go.mod Cargo.toml pom.xml
requirements.txt Gemfile composer.json

# Allow documentation
!*.md
!*.yaml
!*.yml
!*.txt
EOF

git add .
git commit -m "Initialize Organic Flow structure"
```

### Step 2: Document Your First Problem
```bash
# Capture a real problem
cat > knowledge/inputs/problems/slow-search.md << 'EOF'
# Slow Search Performance

**Reported by**: Customer Success Team
**Date**: 2024-07-29
**Impact**: 20+ complaints per day

## The Problem

Users report that searching for products takes 5-10 seconds. 
Some searches timeout completely. This particularly affects:
- Searches with multiple words
- Category filtering
- Price range queries

## Current Workaround

Support team tells users to search with fewer words.

#problem:search-performance #impact:high #customer-complaints
EOF

git add .
git commit -m "Document slow search problem"
```

## The Experiment Workflow

### Step 1: Form a Hypothesis
```bash
cat > knowledge/hypotheses/elasticsearch-migration.md << 'EOF'
# Hypothesis: Elasticsearch Migration

**Created**: 2024-07-29
**Problem**: Slow search performance
**Status**: Testing

## Hypothesis

If we migrate from PostgreSQL full-text search to Elasticsearch,
then search queries will complete in <500ms,
given our current data volume of 1M products.

## Assumptions

1. Elasticsearch can handle our query patterns
2. We can keep the index synchronized with PostgreSQL
3. Infrastructure cost increase is acceptable (<$500/month)
4. Team can learn Elasticsearch basics in 1 sprint

## Success Criteria

- 95th percentile search latency < 500ms
- Zero timeout errors
- Faceted search support (categories, price ranges)
- Search results remain accurate

## Risks

- Additional infrastructure complexity
- Synchronization lag between DB and search
- Team learning curve

#hypothesis:elasticsearch #addresses:slow-search
EOF

git add . && git commit -m "Add Elasticsearch migration hypothesis"
```

### Step 2: Create Experiment or Implementation Branch
```bash
# For quick test (hours to days)
git checkout -b experiment/elasticsearch-search

# For full feature implementation (days to weeks)
git checkout -b impl/search-v2

# Now you can add code, configs, etc.
# This is where actual implementation happens
```

### Step 3: Document Discoveries During Development
As you work, capture learnings in your commit messages:
```bash
git commit -m "DISCOVERY: ES requires 3x storage space vs PostgreSQL for same data"
git commit -m "LEARNING: Bulk indexing optimal batch size is 5000 documents"
git commit -m "ISSUE: Memory usage spikes during reindexing #limit:memory"
```

### Step 4: Extract Knowledge After Experiment
```bash
# Back to main branch
git checkout main

# Document what you learned
cat > knowledge/learnings/elasticsearch-experiment.md << 'EOF'
# Learnings: Elasticsearch Experiment

**Experiment**: elasticsearch-search
**Date**: 2024-08-05
**Result**: Partial success

## What Worked

1. **Search performance**: Achieved <200ms for 95% of queries
2. **Faceted search**: Categories and price filters work perfectly
3. **Fuzzy matching**: Handles typos better than PostgreSQL

## What Didn't Work

1. **Memory usage**: Requires 3x more RAM than expected
   - Formula: RAM_needed = data_size * 3 + 2GB overhead
   - Our 1M products need 12GB RAM minimum

2. **Sync complexity**: Keeping ES in sync with PostgreSQL is tricky
   - Change Data Capture (CDC) adds complexity
   - 2-5 second lag in worst case

3. **Cost**: $800/month vs estimated $500
   - Need 3 nodes for production reliability
   - Each node needs 16GB RAM minimum

## Key Discoveries

### Bulk Indexing Pattern
```
Optimal batch size: 5000 documents
Too small: Network overhead
Too large: Memory pressure
Formula: batch_size = available_memory_mb / (avg_doc_size_kb / 1000) / 4
```

### Memory Scaling
```
ES memory usage = (index_size * 1.5) + (cache_size) + (overhead)
Where:
- index_size = number_of_docs * avg_doc_size * 1.2 (for indexing overhead)
- cache_size = index_size * 0.5 (ES default)
- overhead = 2GB (base ES operations)
```

## Recommendation

Elasticsearch solves the performance problem but adds significant complexity 
and cost. Consider trying:
1. PostgreSQL query optimization first
2. Redis caching layer for common searches
3. Elasticsearch only if simpler solutions fail

#learnings:elasticsearch #outcome:partial-success #cost:higher-than-expected
EOF

# Update experiments registry
cat >> experiments.yaml << 'EOF'

- name: elasticsearch-search
  started: 2024-07-29
  completed: 2024-08-05
  outcome: partial-success
  branch: experiment/elasticsearch-search
  learnings: knowledge/learnings/elasticsearch-experiment.md
  key_discoveries:
    - "ES requires 3x expected memory"
    - "Bulk indexing optimal at 5000 docs"
    - "Sync lag of 2-5 seconds"
  recommendation: "Try simpler solutions first"
EOF

git add . && git commit -m "Extract learnings from Elasticsearch experiment"
```

### Step 5: Create Knowledge PR (The Harvest)
```bash
# Create a branch for the Knowledge PR
git checkout -b knowledge/elasticsearch-learnings

# The harvest produces different knowledge types:

# 1. Add specific learnings
cat > learnings/elasticsearch-memory-usage.md << 'EOF'
# Elasticsearch Memory Requirements

Discovered during experiment/elasticsearch-search:
- ES requires 3x more RAM than data size
- Formula: RAM_needed = (index_size * 3) + 2GB overhead
- Our 1M products = 4GB index = 12GB RAM minimum
EOF

# 2. Document new problems discovered  
cat > inputs/problems/elasticsearch-sync-complexity.md << 'EOF'
# Problem: Elasticsearch Sync Complexity

Keeping ES in sync with PostgreSQL is complex:
- Change Data Capture adds infrastructure
- 2-5 second lag in worst case
- Need to handle failed syncs
EOF

# 3. Update assumptions
echo "Status: PARTIALLY VALIDATED - see experiment/elasticsearch-search" >> assumptions/elasticsearch-simple.md

# Push and create PR
git push origin knowledge/elasticsearch-learnings

# PR Description follows Knowledge PR template
```

### Step 6: Document Patterns for Reuse
```bash
cat > knowledge/patterns/search-optimization-progression.md << 'EOF'
# Pattern: Search Optimization Progression

**Discovered**: Through multiple search optimization attempts
**Context**: When basic search becomes too slow

## The Pattern

Try solutions in this order to minimize complexity:

### Level 1: Database Optimization
- Add appropriate indexes
- Optimize queries
- Use materialized views for complex searches
- **When sufficient**: <1M records, simple queries

### Level 2: Caching Layer  
- Redis for frequent searches
- Cache warming for popular terms
- TTL based on update frequency
- **When sufficient**: Read-heavy, predictable queries

### Level 3: Search Engine
- Elasticsearch/Solr for full features
- Significant operational overhead
- Best for complex requirements
- **When needed**: Facets, fuzzy search, >10M records

## Key Insight

Each level adds complexity. Often, Level 1 or 2 is sufficient 
but teams jump to Level 3 because it's "modern."

#pattern:search-optimization #reusable
EOF

git add . && git commit -m "Document search optimization pattern"
```

## Common Workflows

### Quick Experiment
```bash
# 1. Document the hypothesis
echo "# Redis Cache Test" > knowledge/hypotheses/redis-cache.md
echo "If we cache search results in Redis..." >> knowledge/hypotheses/redis-cache.md

# 2. Create experiment branch
git checkout -b experiment/redis-cache

# 3. Quick implementation and test
# ... code and test ...

# 4. Extract learnings via Knowledge PR
git checkout -b knowledge/redis-cache-learnings
echo "## Learnings: Redis reduced latency by 70%" > knowledge/learnings/redis-cache.md
git push origin knowledge/redis-cache-learnings
```

### Full Implementation
```bash
# 1. Document the feature
echo "# Search System V2" > knowledge/inputs/ideas/search-v2.md
echo "Complete search overhaul based on learnings..." >> knowledge/inputs/ideas/search-v2.md

# 2. Create implementation branch
git checkout -b impl/search-v2

# 3. Build feature, possibly spawning experiments
git checkout -b experiment/search-v2-indexing-strategy
# ... test indexing approaches ...
git checkout impl/search-v2
git merge --no-ff experiment/search-v2-indexing-strategy

# 4. If successful, promote to release
git checkout -b release/search-v2
git merge --no-ff impl/search-v2

# 5. Always create Knowledge PR
git checkout -b knowledge/search-v2-complete
# Document all learnings from the implementation
```

### Starting Fresh Work
```bash
# 1. Document the input
echo "# New Feature Request" > knowledge/inputs/ideas/dark-mode.md
echo "Users asking for dark mode support..." >> knowledge/inputs/ideas/dark-mode.md

# 2. Create hypothesis
echo "# Dark Mode Implementation" > knowledge/hypotheses/css-variables-dark-mode.md
echo "If we use CSS variables for theming..." >> knowledge/hypotheses/css-variables-dark-mode.md

# 3. Branch and experiment
git checkout -b experiment/dark-mode-css-vars
```

### Investigating a Bug
```bash
# 1. Document the problem
echo "# Memory Leak in Production" > knowledge/inputs/problems/memory-leak.md
echo "Server memory grows continuously..." >> knowledge/inputs/problems/memory-leak.md

# 2. Form investigation hypothesis  
echo "# Memory Leak Investigation" > knowledge/hypotheses/websocket-connection-leak.md
echo "Hypothesis: WebSocket connections not closing properly..." >> knowledge/hypotheses/websocket-connection-leak.md

# 3. Create investigation branch
git checkout -b experiment/investigate-memory-leak
```

### Applying Past Patterns
```bash
# 1. Search for relevant patterns
grep -r "cache" knowledge/patterns/
grep -r "scaling" knowledge/constraints/

# 2. Reference in new hypothesis
echo "Based on pattern in knowledge/patterns/caching-strategy.md" >> new-hypothesis.md

# 3. Build on previous learnings
echo "Applying lessons from knowledge/learnings/redis-experiment.md" >> new-hypothesis.md
```

### Example: Complete Harvest Flow
```bash
# After completing experiment/payment-integration

# Create harvest branch
git checkout -b knowledge/payment-integration-harvest

# 1. Document specific learnings
mkdir -p learnings
cat > learnings/stripe-webhook-timing.md << 'EOF'
# Stripe Webhook Timing Issues

- Webhooks can arrive out of order
- Duplicate webhooks common (seen 3x in testing)
- Delays up to 24 hours during Stripe outages
- Must implement idempotency
EOF

# 2. Extract pattern
mkdir -p patterns  
cat > patterns/webhook-idempotency.md << 'EOF'
# Pattern: Webhook Idempotency

## Context
When receiving webhooks from external services

## Solution
1. Store webhook ID with 24hr TTL
2. Return immediate 200 if already processed
3. Process async to avoid timeouts

## Applies to
Any webhook endpoint (Stripe, PayPal, GitHub, etc)
EOF

# 3. Update specifications
cat >> specifications/payment-processing-requirements.md << 'EOF'

## Webhook Requirements (validated)
- Must handle out-of-order delivery
- Must be idempotent
- Must respond within 3 seconds
Evidence: experiment/payment-integration
EOF

# 4. Document new problem
cat > inputs/problems/webhook-replay-attacks.md << 'EOF'  
# Problem: Webhook Replay Attack Vulnerability

Discovered that without signature validation,
webhooks can be replayed by attackers.
Need to implement webhook signature validation.
EOF

# 5. Create Knowledge PR
git add .
git commit -m "Harvest learnings from payment integration

- Documented webhook timing issues
- Created idempotency pattern
- Updated payment requirements
- Identified security vulnerability"

git push origin knowledge/payment-integration-harvest
```

## Team Collaboration

### Code Reviews for Knowledge
Treat knowledge PRs with the same care as code:
```bash
# Create knowledge update branch
git checkout -b knowledge/update-search-learnings

# Make updates
# Edit knowledge/learnings/search-improvements.md

# Create PR
git push origin knowledge/update-search-learnings
# Create PR: "Extract learnings from search optimization"
```

### Knowledge Review Checklist
- [ ] Is the problem clearly stated?
- [ ] Are assumptions explicit?
- [ ] Are discoveries specific and measurable?
- [ ] Could someone else learn from this?
- [ ] Are patterns abstracted from implementation details?

### Knowledge PR Process
1. Create PR from knowledge extraction branch to main
2. Use Knowledge PR template (see organic-flow-knowledge-pr.md)
3. Review focuses on accuracy and completeness
4. Merge preserves learning for future use

### Handling Conflicts
When team members discover conflicting information:
```markdown
# Conflicting Discovery: Cache Size Impact

## Previous Understanding
"Cache size has linear performance improvement" 
- From: redis-caching-experiment
- Date: 2024-07-15

## New Discovery  
"Cache performance plateaus at 10GB due to memory management overhead"
- From: cache-optimization-v2
- Date: 2024-08-01

## Resolution
Both are correct in different contexts:
- Linear improvement up to 10GB
- Diminishing returns beyond that
- Formula: speedup = min(cache_size_gb * 0.1, 1.0)

#updates:previous-understanding #nuance-added
```

## Measurement and Success

### Tracking Knowledge Growth
```bash
# Simple metrics
echo "## Knowledge Metrics - $(date)" > knowledge/metrics.md
echo "Problems documented: $(ls knowledge/inputs/problems | wc -l)" >> knowledge/metrics.md
echo "Hypotheses tested: $(grep -c "^-" experiments.yaml)" >> knowledge/metrics.md
echo "Patterns discovered: $(ls knowledge/patterns | wc -l)" >> knowledge/metrics.md
echo "Constraints found: $(ls knowledge/constraints | wc -l)" >> knowledge/metrics.md
```

### Success Indicators
1. **Fewer repeated mistakes**: Check if similar problems recur
2. **Faster problem solving**: Time from problem to solution
3. **Better decisions**: Hypotheses validated vs invalidated ratio
4. **Knowledge reuse**: How often patterns are referenced

## Tips for Success

### Start Small
- Document just one problem today
- Extract learnings from your next bug fix
- Write one hypothesis before coding

### Make It Natural
- Use your own voice in documentation
- Don't force structure that doesn't fit
- Add hashtags as they become useful

### Focus on Learning
- Failed experiments are valuable
- Document surprises and discoveries
- Ask "what would help future me?"

### Keep It Sustainable
- Don't document everything
- Focus on non-obvious learnings
- Extract patterns after 3+ similar cases

## Common Pitfalls to Avoid

### Don't Over-Structure
❌ Creating 50 subcategories upfront
✅ Let structure emerge from usage

### Don't Mix Code and Knowledge
❌ Putting implementation in main branch
✅ Keep clear separation

### Don't Wait for Perfect
❌ Delaying until you have complete understanding
✅ Document as you learn

### Don't Skip Extraction
❌ Leaving learnings in experiment branches
✅ Always extract before moving on

## Getting Your Team Onboard

1. **Lead by example**: Start documenting your own work
2. **Share wins**: When knowledge helps solve a problem
3. **Make it easy**: Provide templates and examples
4. **Celebrate learning**: Recognize great knowledge contributions
5. **Be patient**: Cultural change takes time

Remember: The goal is capturing and sharing knowledge, not following a rigid process. Adapt Organic Flow to work for your team.