---
type: trunk
id: experiment-branch-lifecycle
title: "Experiments must follow a defined lifecycle from hypothesis to harvest"
validated_roots:
  - failed-experiments-valuable
  - git-branches-for-knowledge
priority: P0
status: validated
evidence:
  - "Unmanaged experiments create chaos (OXGN: 8+ abandoned repos)"
  - "Lifecycle tracking enables knowledge extraction"
  - "Clear states prevent zombie implementations"
---

# Requirement: Experiment Branch Lifecycle

## The Complete Lifecycle

Every experiment must follow this lifecycle:

```
Create → Active → Complete → Harvest → Archive
                     ↓
                  Abandon → Harvest → Archive
```

No experiment can skip the Harvest phase.

## Lifecycle Stages

### 1. Create (Hypothesis Formation)
**Branch**: `experiment/[feature]-[approach]`
**Required Files**:
- `EXPERIMENT.md` - Documents hypothesis and success criteria
- `APPROACH.md` - Technical approach and rationale

**Example**:
```markdown
# EXPERIMENT.md
## Hypothesis
Using Redis for session storage will reduce login time to <2s

## Success Criteria
- [ ] Login time < 2 seconds
- [ ] Support 10k concurrent sessions
- [ ] Maintain session security

## Testing Method
Load test with production-like data
```

### 2. Active (Implementation)
**Duration**: Recommended 30 days, maximum 90 days
**Activities**:
- Implement solution
- Test hypothesis
- Document findings
- Update progress

**Status Tracking**:
```yaml
# In implementations.yaml
- id: session-redis
  branch: experiment/session-redis
  status: active
  started: 2025-01-21
  deadline: 2025-02-20
  progress: "Login time at 1.8s, testing scale"
```

### 3. Complete/Abandon (Outcome)
**Complete**: Hypothesis tested, regardless of result
**Abandon**: Cannot complete test, but learned why

**Required Documentation**:
```markdown
# RESULTS.md
## Outcome: [Success|Failure|Partial|Abandoned]

## Results
- Login time: 1.8s ✓
- Concurrent sessions: 8k ✗
- Security maintained: ✓

## Conclusion
Redis works for speed but hits scaling limits
```

### 4. Harvest (Knowledge Extraction)
**MANDATORY** - No experiment ends without harvest

**Process**:
1. Create harvest branch: `harvest/[experiment]-insights`
2. Extract learnings to knowledge/
3. Update roots with validation results
4. Document new seeds discovered
5. Submit PR to main

**Harvest Template**:
```markdown
# knowledge/session-storage-insights.md
## Experiment: session-redis
## Date: 2025-02-20

### What We Learned
1. Redis session storage is fast but memory-limited
2. 8k session limit inadequate for our scale
3. Hybrid approach might work better

### Validated Assumptions
- ✓ Redis reduces latency
- ✗ Redis scales infinitely
- ✓ Security model compatible

### New Questions Raised
- Could Redis cluster solve scaling?
- Is session storage the real bottleneck?
- Should we explore edge session management?

### Recommendations
- For <5k users: Use Redis
- For >5k users: Investigate alternatives
- Consider hybrid local/remote sessions
```

### 5. Archive (Preservation)
**Options**:
1. **Keep Branch**: For successful experiments
2. **Delete Branch**: After knowledge harvested
3. **Tag Release**: If promoting to production

**Registry Update**:
```yaml
- id: session-redis
  branch: experiment/session-redis
  status: archived
  outcome: partial-success
  harvest_pr: #47
  lessons_learned:
    - "Redis fast but memory-limited"
    - "8k session ceiling discovered"
    - "Hybrid approach recommended"
```

## Enforcement Rules

### Time Limits
- Experiments older than 90 days trigger warnings
- Experiments older than 180 days auto-marked abandoned
- Harvesting must happen within 30 days of completion

### Branch Protection
```yaml
# .github/branch-protection.yml
experiment/*:
  require_files:
    - EXPERIMENT.md
    - APPROACH.md
  max_age_days: 90
  require_harvest_before_delete: true
```

### Automated Tracking
```bash
# Weekly experiment status check
sprout-flow experiment status --warn-old --list-abandoned
```

## Benefits of Lifecycle Management

### Prevents Zombie Code
- No forgotten experiments
- Clear status for everything
- Automatic cleanup triggers

### Ensures Knowledge Capture
- Mandatory harvest phase
- Can't delete without extracting value
- Failed experiments contribute insights

### Enables Portfolio View
```
Active Experiments: 3
├── auth-passkeys (Day 12 of 30)
├── storage-s3 (Day 45 of 90) ⚠️
└── ui-react (Day 5 of 30)

Awaiting Harvest: 2
├── payment-stripe (Completed)
└── search-elastic (Abandoned)

This Month's Insights: 7 new patterns discovered
```

### Supports Decision Making
- See all approaches tried
- Understand why each ended
- Make informed choices
- Avoid repeated failures

## Implementation Requirements

### 1. Experiment Creation Tool
```bash
sprout-flow experiment create auth-jwt \
  --hypothesis "JWT auth scales better than sessions" \
  --success-criteria "Support 50k concurrent users"
```

### 2. Status Dashboard
- List all active experiments
- Show age and deadline
- Highlight harvest needed
- Track knowledge accumulated

### 3. Harvest Assistant
```bash
sprout-flow harvest auth-jwt \
  --outcome partial \
  --learned "JWT works but refresh complex"
```

### 4. Lifecycle Automation
- Daily status updates
- Weekly reminder emails
- Monthly cleanup runs
- Quarterly reports

## Success Validation

✅ **Clear lifecycle stages**: Defined and documented
✅ **Mandatory harvest**: Cannot skip knowledge extraction  
✅ **Time boundaries**: Prevents endless experiments
✅ **Status visibility**: Always know state of experiments

## Related Trunks
- [harvest-protocol-required](harvest-protocol-required.md)
- [implementation-registry-spec](implementation-registry-spec.md)
- [knowledge-accumulation-metrics](knowledge-accumulation-metrics.md)