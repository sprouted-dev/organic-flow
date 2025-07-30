---
title: Knowledge Pr
section: guide
---

# The Knowledge PR: Structured Learning Extraction

*Created: 2025-07-29*
*Context: How Knowledge PRs work - the key mechanism for extracting learning from code*

## What is a Knowledge PR?

A Knowledge PR is a pull request to the knowledge branch (usually `main`) that extracts and documents learnings from experiments or implementations. Unlike code PRs that integrate features, Knowledge PRs integrate understanding.

## Anatomy of a Knowledge PR

### Title Format
```
Extract learnings from [branch-type]/[branch-name]
```

Examples:
- `Extract learnings from experiment/redis-cache`
- `Extract learnings from impl/search-v2`
- `Extract learnings from hotfix/session-timeout`

### PR Description Template

```markdown
# Knowledge PR: [Branch Name]

## Summary
Brief overview of what was attempted and why.

## Hypotheses Tested
- [ ] Hypothesis 1: [What you thought would happen]
  - Result: [What actually happened]
  - Evidence: [Specific metrics, errors, or observations]

## Key Discoveries

### Constraints Found
- [System/tool] has limit of [specific number] because [reason]
- Performance degrades when [condition] due to [cause]

### Patterns Identified  
- Pattern name: [Descriptive name]
  - Context: [When to use]
  - Solution: [What to do]
  - Trade-offs: [Costs and benefits]

### New Problems Uncovered
- [Problem]: [Description] #problem:[tag]
- [Problem]: [Description] #problem:[tag]

## Outcome

### For Experiments
**Result**: Success/Partial Success/Failed/Abandoned
**Learning Value**: High/Medium/Low
**Follow-up**: [Next experiments suggested]

### For Implementations
**Decision**: Proceeding to release / Needs rework / Abandoning
**Release Branch**: impl/feature → release/v2.1 (if applicable)
**Major Changes from Plan**: [What changed during implementation]

## Knowledge Artifacts Created/Updated

### New Files
- `knowledge/patterns/[pattern-name].md` - [Description]
- `knowledge/constraints/[constraint-name].md` - [Description]

### Updated Files  
- `knowledge/learnings/[topic].md` - Added [what]
- `experiments.yaml` - Updated with outcome

## Reusable Insights

1. **For Future Developers**: [Key takeaway]
2. **For Architecture Decisions**: [Key insight]
3. **For Similar Problems**: [Pattern or anti-pattern]
```

## Types of Knowledge PRs

### 1. Experiment Knowledge PR

Focus on hypothesis validation:

```markdown
# Knowledge PR: experiment/websocket-scaling

## Summary
Tested WebSocket server scaling to understand connection limits.

## Hypotheses Tested
- ✅ Can handle 50k connections per server
  - Result: Failed at exactly 50k
  - Evidence: OOM error, each connection uses ~100KB

- ❌ Linear performance scaling
  - Result: Performance drops at 30k connections
  - Evidence: CPU spike, GC pressure

## Key Discoveries

### Hard Limits
- Max connections: 50,000 (memory bound)
- Optimal range: 20,000-30,000
- Formula: `max_conn = available_memory / 100KB`

### New Pattern
**Pattern**: Connection Pooling with Backpressure
- Return 503 when connections > 45k
- Prevents cascade failures
- Allows graceful degradation
```

### 2. Implementation Knowledge PR

Focus on integration challenges and real-world complexities:

```markdown
# Knowledge PR: impl/payment-system-v2

## Summary
Implemented new payment system integrating Stripe, PayPal, and crypto.

## Initial Assumptions vs Reality

### Assumed: Single webhook endpoint would work
**Reality**: Each provider has different retry/timeout behavior
**Solution**: Provider-specific endpoints with shared processing

### Assumed: Transactions are atomic
**Reality**: Network failures create partial states
**Solution**: Saga pattern with compensation

## Patterns Developed

### Payment Provider Abstraction
```
interface PaymentProvider {
  charge(): Promise<Result>
  refund(): Promise<Result>  
  webhook(): WebhookHandler
}
```
Works for all providers with provider-specific adapters.

## Integration Challenges

1. **Webhook deduplication**: Providers send duplicates
   - Solution: 24-hour cache of webhook IDs
   
2. **Currency precision**: Mixing cents/dollars/satoshis
   - Solution: Everything in smallest unit internally

3. **Testing payments**: Can't test production flows
   - Solution: Record/replay test framework
```

### 3. Hotfix Knowledge PR

Focus on root cause and prevention:

```markdown
# Knowledge PR: hotfix/memory-leak

## Summary
Emergency fix for production memory leak causing hourly crashes.

## Root Cause Analysis

### Symptom
Node process memory growing 100MB/hour

### Investigation Path
1. Heap dumps showed EventEmitter listeners
2. Traced to WebSocket connection handler
3. Found missing `removeListener` on disconnect

### Root Cause
```javascript
// Before (leaking)
ws.on('message', this.handleMessage.bind(this))

// After (fixed)
const handler = this.handleMessage.bind(this)
ws.on('message', handler)
ws.on('close', () => ws.off('message', handler))
```

## Prevention Pattern

**Pattern**: Always Pair Event Listeners
```javascript
class SafeEventHandler {
  listen(emitter, event, handler) {
    emitter.on(event, handler)
    this.cleanup.push(() => emitter.off(event, handler))
  }
  
  destroy() {
    this.cleanup.forEach(fn => fn())
  }
}
```

## New Monitoring
- Alert when memory growth > 50MB/hour
- Weekly heap diff analysis
- Event listener count metrics
```

### 4. Failed Implementation Knowledge PR

Failures often produce the most valuable knowledge:

```markdown
# Knowledge PR: impl/microservices-migration (ABANDONED)

## Summary  
Attempted to split monolith into 5 microservices. Abandoned after 3 months.

## Why It Failed

### Technical Challenges
1. **Data consistency**: Distributed transactions too complex
2. **Latency**: 5x increase in response time
3. **Debugging**: Lost ability to trace requests

### Organizational Challenges  
1. **Team size**: Need 2-3 devs per service minimum
2. **Deployment complexity**: From 1 to 15 deploy steps
3. **Monitoring cost**: 10x increase

## Valuable Learnings

### When Microservices Make Sense
- [ ] Team > 50 developers
- [ ] Clear domain boundaries
- [ ] Different scaling needs per service
- [ ] Independent deployment crucial
- [ ] Budget for infrastructure team

We had none of these.

### Alternative Approach
**Modular Monolith Pattern**
- Separate modules in same codebase
- Clear interfaces between modules
- Can split later if needed
- 90% of benefits, 10% of complexity

## Cost of Attempt
- 3 developer-months
- $15k in infrastructure tests
- Valuable experience
- Clear architectural direction
```

## Knowledge PR Review Process

### Review Checklist

**Accuracy**
- [ ] Claims backed by evidence
- [ ] Numbers are specific and measured
- [ ] Assumptions clearly marked

**Completeness**
- [ ] All hypotheses addressed
- [ ] Failures explained
- [ ] New questions documented

**Clarity**
- [ ] Would a new developer understand?
- [ ] Technical terms explained
- [ ] Examples provided

**Value**
- [ ] Prevents future mistakes
- [ ] Enables better decisions
- [ ] Patterns are reusable

### Who Reviews?

Depending on team size:

**Small Team**: Anyone who wasn't on the experiment
**Medium Team**: Designated knowledge reviewers
**Large Team**: Domain experts for technical accuracy

### Review Comments Focus

Good review comments:
- "This limit - is it per process or per machine?"
- "Could you add the error message you saw?"
- "This pattern looks similar to what we did in Project X"
- "What made you choose 5000 for batch size?"

Not helpful:
- "Nice work!" (alone)
- "LGTM" (without reading)
- Style nitpicks on markdown

## Continuous Knowledge Integration

### Don't Wait Until The End

For long-running implementations, create periodic Knowledge PRs:

```
impl/big-feature
├── Week 1: Knowledge PR - Initial discoveries
├── Week 3: Knowledge PR - Architecture decisions  
├── Week 5: Knowledge PR - Integration challenges
└── Week 7: Final Knowledge PR - Complete learnings
```

### The Daily Practice

During standup:
- "I discovered X yesterday" → Note for Knowledge PR
- "I'm stuck on Y" → Document in problems/
- "Z worked perfectly" → Capture pattern

### The Weekly Rhythm

Every Friday:
1. Review the week's experiments
2. Create Knowledge PRs for completed work
3. Review pending Knowledge PRs
4. Update patterns and constraints

## Measuring Knowledge PR Quality

### Metrics That Matter

**Specificity Score**
- Vague: "Caching helped performance"
- Specific: "Redis caching reduced p95 latency from 800ms to 200ms"

**Reusability Score**
- Low: "We fixed the bug"
- High: "Pattern: Always pair event listeners to prevent memory leaks"

**Evidence Score**
- Low: "It seemed faster"
- High: "Load test showed 3x throughput increase (logs in PR #123)"

### Knowledge Velocity

Track over time:
- Time from experiment → Knowledge PR
- Knowledge PRs per sprint
- Patterns discovered per month
- Problems prevented by past knowledge

## Common Pitfalls

### 1. Waiting Too Long
**Problem**: Knowledge gets stale, details forgotten
**Solution**: Create PR within 48 hours of completion

### 2. Too Implementation-Specific
**Problem**: "We used React hooks with Redux"
**Solution**: "Pattern: Separate state management from UI components"

### 3. Missing the "Why"
**Problem**: "We set timeout to 30 seconds"
**Solution**: "30s timeout because 95% of successful requests complete in <10s"

### 4. No Follow-Up Actions
**Problem**: Discoveries don't lead to improvements
**Solution**: Every problem discovered should create a new hypothesis

## Templates and Tools

### Quick Command-Line Template

```bash
# Create Knowledge PR template
cat > .knowledge/pr-template.md << 'EOF'
# Knowledge PR: $(git branch --show-current)

## Summary
[What we tried and why]

## Hypotheses Tested
- [ ] [Hypothesis]: [Result]

## Key Discoveries
- [Discovery]: [Evidence]

## Outcome
Result: [Success/Failed/Partial]
Next: [What to try next]

## Files Changed
- [ ] Updated experiments.yaml
- [ ] Added patterns/[name].md
- [ ] Added constraints/[name].md
EOF
```

### GitHub PR Template

In `.github/pull_request_template/knowledge_pr.md`:

```markdown
<!-- 
This is a Knowledge PR template.
Delete sections that don't apply.
Be specific with numbers and evidence.
-->

## Knowledge PR Checklist
- [ ] Hypotheses have results
- [ ] Discoveries have evidence  
- [ ] Patterns are abstracted
- [ ] Next steps identified
- [ ] experiments.yaml updated

[Rest of template...]
```

## The Cultural Shift

Knowledge PRs represent a fundamental shift:

**From**: "Ship features"
**To**: "Ship features AND understanding"

**From**: "Failed experiment = waste"
**To**: "Failed experiment = valuable data"

**From**: "Knowledge in heads"
**To**: "Knowledge in repository"

Make Knowledge PRs a celebrated part of your process. They're not extra work - they're the work that makes all future work easier.