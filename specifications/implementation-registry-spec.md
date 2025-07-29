---
type: trunk
id: implementation-registry-spec
title: "All implementation attempts must be tracked in a central registry"
validated_roots:
  - multiple-implementations-chaos
  - git-branches-for-knowledge
priority: P0
status: validated
evidence:
  - "OXGN: 8+ implementations discovered by accident"
  - "Registry eliminates 'which repo?' questions"
  - "Enables portfolio view of all attempts"
---

# Requirement: Implementation Registry

## The Central Registry

Every Organic Flow repository must maintain an `implementations.yaml` file in the main branch that tracks ALL implementation attempts.

## Registry Structure

### Required Fields
```yaml
# implementations.yaml
metadata:
  description: "Registry of all implementation attempts"
  created: YYYY-MM-DD
  last_updated: YYYY-MM-DD
  total_experiments: N
  successful_experiments: N
  failed_experiments: N
  active_experiments: N

implementations:
  - id: unique-identifier
    type: [experiment|release|prototype|spike]
    status: [planned|active|completed|abandoned|archived]
    branch: branch-name
    started: YYYY-MM-DD
    ended: YYYY-MM-DD (if applicable)
    duration_days: N
    
    # Hypothesis tracking
    hypothesis: "What we're testing"
    tests_roots: 
      - root-id-1
      - root-id-2
    success_criteria:
      - "Measurable criterion 1"
      - "Measurable criterion 2"
    
    # Outcome tracking
    outcome: [success|failure|partial|abandoned]
    outcome_details: "Specific results"
    
    # Knowledge tracking
    harvest:
      status: [pending|completed|skipped]
      pr_number: N
      insights_count: N
      patterns_created: N
      roots_validated: N
      roots_invalidated: N
      new_seeds_discovered: N
    
    # Lessons summary
    key_lessons:
      - "Primary learning 1"
      - "Primary learning 2"
      - "Primary learning 3"
    
    # Technical details
    technologies:
      - "React"
      - "Redis"
      - "PostgreSQL"
    
    # Links
    links:
      documentation: "path/to/docs"
      results: "path/to/results"
      code: "URL if external"
```

## Registry States

### Planned
```yaml
- id: auth-passkeys
  type: experiment
  status: planned
  hypothesis: "Passkeys will improve security and UX"
  planned_start: 2025-02-01
  estimated_duration: 30
```

### Active
```yaml
- id: storage-s3-optimization
  type: experiment
  status: active
  branch: experiment/storage-s3-opt
  started: 2025-01-15
  day_count: 7
  progress: "Reduced costs 40%, testing reliability"
  blockers: "Need production data for real test"
```

### Completed
```yaml
- id: payment-stripe-integration
  type: experiment
  status: completed
  outcome: success
  started: 2024-12-01
  ended: 2024-12-20
  harvest:
    status: completed
    pr_number: 134
    insights_count: 12
  key_lessons:
    - "Stripe webhooks require idempotency"
    - "Test mode doesn't simulate all scenarios"
    - "Currency handling needs explicit rounding"
```

### Abandoned
```yaml
- id: blockchain-receipts
  type: experiment  
  status: abandoned
  started: 2024-11-01
  ended: 2024-11-15
  outcome: abandoned
  outcome_details: "Technical complexity not worth benefit"
  harvest:
    status: completed
    pr_number: 98
  key_lessons:
    - "Blockchain too slow for real-time receipts"
    - "Gas fees unpredictable"
    - "Users don't value immutability here"
```

## Registry Views

### Portfolio Dashboard
```
Active Experiments (3)
├── auth-passkeys (Day 7/30) - On track
├── storage-s3-opt (Day 22/30) - At risk  
└── ui-redesign (Day 45/90) - Overdue

Awaiting Harvest (2)
├── payment-stripe - Success, needs documentation
└── blockchain-receipts - Abandoned, needs lessons

This Quarter Summary
├── Experiments Started: 8
├── Successfully Completed: 3 (38%)
├── Abandoned: 2 (25%)
├── Still Active: 3 (37%)
└── Knowledge Insights: 47
```

### Technology Analysis
```yaml
# Auto-generated from registry
technology_usage:
  React: 
    experiments: 12
    success_rate: 75%
  Redis:
    experiments: 5
    success_rate: 40%
  PostgreSQL:
    experiments: 18
    success_rate: 89%
```

### Pattern Detection
```yaml
# Auto-generated insights
patterns_observed:
  - name: "Redis scaling issues"
    frequency: 3
    experiments: [session-redis, cache-redis, queue-redis]
    common_failure: "Memory limits at scale"
    
  - name: "Stripe integration complexity"
    frequency: 4
    experiments: [payment-v1, payment-v2, subscription-mgmt]
    common_issue: "Webhook handling"
```

## Registry Maintenance

### Update Triggers
1. **Experiment Created**: Add planned entry
2. **Experiment Started**: Update to active
3. **Weekly Status**: Update progress/blockers
4. **Experiment Ended**: Update outcome
5. **Harvest Completed**: Update knowledge metrics

### Automation Support
```bash
# CLI commands for registry management
sprout-flow registry add --type experiment --hypothesis "..."
sprout-flow registry update auth-passkeys --status active
sprout-flow registry report --quarter Q1-2025
sprout-flow registry analyze --pattern-detection
```

### Quality Checks
```yaml
# Automated validations
checks:
  - No experiments older than 90 days without harvest
  - No active experiments without weekly updates  
  - No completed experiments without outcomes
  - No abandoned experiments without lessons
  - All branches in registry actually exist
```

## Benefits of Central Registry

### Eliminates Confusion
- One place to check what exists
- Clear status for everything
- No hidden implementations
- No forgotten experiments

### Enables Learning
- See all approaches tried
- Identify patterns in failures
- Track success rates
- Spot technology issues

### Supports Planning
- Avoid repeating experiments
- Build on previous attempts
- See what's currently active
- Plan resource allocation

### Provides Metrics
- Experiment velocity
- Success rates
- Knowledge accumulation
- Technology effectiveness

## Migration Support

For existing projects like OXGN:
```yaml
# Special section for discovered implementations
discovered_implementations:
  - id: oxgn-be-legacy
    status: discovered
    location: ~/clients/oxgn/oxgn-be
    last_activity: 2023-06-15
    purpose: "Unknown - needs investigation"
    next_action: "Analyze and harvest insights"
```

## Success Validation

✅ **Central location**: Single implementations.yaml file
✅ **Complete tracking**: All attempts recorded
✅ **Status clarity**: Always know current state
✅ **Knowledge metrics**: Harvest tracking built in

## Related Trunks
- [experiment-branch-lifecycle](experiment-branch-lifecycle.md)
- [harvest-protocol-required](harvest-protocol-required.md)
- [knowledge-accumulation-metrics](knowledge-accumulation-metrics.md)