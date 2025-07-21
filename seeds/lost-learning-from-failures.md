---
type: seed
id: lost-learning-from-failures
problem: "Valuable lessons from failed experiments are lost when code is abandoned"
discovered: 2025-01-21
status: validated
evidence:
  - source: "OXGN oxgn-mobile repository"
    description: "React Native implementation abandoned with no documentation of why"
  - source: "Industry research"
    description: "Post-mortems rarely captured, lessons not accessible to future teams"
  - source: "Developer testimony"
    description: "We tried that 2 years ago, it didn't work - but I can't remember why"
impact:
  severity: high
  scope: "All experimental development"
  cost: "Repeated failures, missed insights, slow evolution"
---

# Problem: Lost Learning from Failures

## The Silent Knowledge Drain

Failed experiments are goldmines of knowledge. They teach us:
- What doesn't work (and why)
- Hidden constraints we didn't know existed
- False assumptions we were making
- Better questions to ask

But when experiments fail, teams typically delete the code and move on, taking all those lessons to the grave.

## The Failure Amnesia Pattern

### Stage 1: Optimistic Beginning
"Let's try React Native for better mobile experience!"
- High energy
- Clear hypothesis
- Investment approved

### Stage 2: Reality Hits
- Performance issues emerge
- Platform limitations discovered
- Complexity compounds
- Team struggles

### Stage 3: The Quiet Abandonment
- Development slows
- Team pivots to "new approach"
- Repository goes stale
- Knowledge evaporates

### Stage 4: History Repeats
Two years later: "Let's try Flutter for better mobile experience!"
- Same optimism
- Same discovery process
- Same failures
- Same abandonment

## Evidence of Lost Learning

### OXGN Mobile Attempts
Found multiple mobile implementations:
- `oxgn-mobile/` - React Native, last commit 2023
- `oxgn-ios/` - Native iOS, appears incomplete
- Mobile code in `oxgn-mvp/` - Current approach

No documentation explaining:
- Why React Native was abandoned
- What specific issues were encountered
- Why native iOS didn't work out
- How current approach addresses past problems

### The "Tribal Knowledge" Problem
In interviews, developers say things like:
- "We tried microservices but it didn't work out"
- "There was some issue with the payment provider"
- "The senior dev who knew left last year"
- "I think it was too slow?"

Vague memories instead of concrete lessons.

## The True Cost of Lost Learning

### Repeated Failures
Without captured lessons:
- Teams make identical mistakes
- Same technical dead-ends explored
- Same architectural problems encountered
- No learning curve, just repetition

### Slower Evolution
Each team starts from zero:
- No building on previous insights
- No accumulated wisdom
- Every decision is "new"
- Progress is linear, not exponential

### Risk Aversion
When failures aren't understood:
- Teams become afraid to experiment
- "We tried that once" becomes a blocker
- Innovation stalls
- Safe choices dominate

## Why Current Practices Fail

### Post-Mortems
- Usually only for production incidents
- Focus on blame prevention
- Stored in documents, not with code
- Not connected to future work

### Code Comments
- Deleted with the code
- Don't capture the "why we stopped"
- Focus on how, not why not

### Team Retrospectives
- Capture feelings, not technical lessons
- Not preserved for future teams
- Focus on process, not knowledge

## The Knowledge Waste

Consider what we lose:
- **Technical Discoveries**: "React Native's bridge is too slow for real-time updates"
- **Constraint Identification**: "Payment provider requires separate merchant accounts per country"
- **Architecture Lessons**: "Event sourcing creates more problems than it solves for our use case"
- **Tool Limitations**: "GraphQL subscriptions don't work well with our CDN"

Each of these insights cost weeks or months to learn, then vanish.

## The Harvest Imperative

Failed experiments should be celebrated for their knowledge contribution, not hidden in shame. We need:
- Explicit knowledge extraction process
- Lessons captured before code deletion
- Insights fed back into planning
- Failure treated as valuable data

## Related Seeds
- [experiment-lifecycle-tracking](experiment-lifecycle-tracking.md)
- [knowledge-harvest-resistance](knowledge-harvest-resistance.md)
- [failure-shame-culture](failure-shame-culture.md)