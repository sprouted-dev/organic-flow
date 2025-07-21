---
type: seed
id: documentation-drift
problem: "Documentation diverges from reality until it becomes harmful fiction"
discovered: 2025-01-21
status: validated
evidence:
  - source: "OXGN API documentation"
    description: "Docs describe endpoints that no longer exist, miss ones that do"
  - source: "Developer behavior"
    description: "Developers read code instead of docs because docs lie"
  - source: "Onboarding failure"
    description: "New developers misled by outdated documentation"
impact:
  severity: high
  scope: "All documented systems"
  cost: "Wasted time, broken integrations, trust erosion"
---

# Problem: Documentation Drift

## The Inevitable Decay

Documentation drift isn't a failure of discipline - it's a structural problem. When documentation is separate from the thing it documents, divergence is inevitable.

## The Drift Cycle

### Day 1: Perfect Alignment
- Code and docs match perfectly
- Everything is clear
- Developers are happy

### Week 2: First Divergence
- "Quick fix" to code
- "I'll update docs later"
- Mental note forgotten

### Month 2: Accumulating Lies
- Multiple undocumented changes
- Docs describe ideal, not reality
- New features not mentioned

### Month 6: Harmful Fiction
- Docs actively misleading
- Developers warn: "Don't trust the docs"
- New hires make wrong assumptions

### Year 1: Abandonment
- Nobody updates docs
- Nobody reads docs
- Docs become archaeology

## Evidence from the Field

### OXGN Documentation Audit
Comparing docs to implementation revealed:
- 30% of documented API endpoints don't exist
- 50% of actual endpoints aren't documented
- Parameter names changed but docs weren't updated
- Authentication flow completely different
- Response formats evolved without documentation

### Developer Adaptations
How developers cope with drift:
- "Read the code, not the docs"
- "Ask Sarah, she knows how it really works"
- "The tests are the real documentation"
- "grep is your friend"

## Why Drift Is Inevitable

### Separate Artifacts
When docs and code live separately:
- Two places to update
- Easy to forget one
- No enforcement mechanism
- Drift compounds

### Different Audiences
Docs written for idealized readers:
- Assume knowledge that doesn't exist
- Skip "obvious" crucial details
- Use outdated terminology
- Miss real use cases

### Time Pressure
Reality of development:
- Features ship under deadline
- Docs are "nice to have"
- "We'll document in next sprint"
- Next sprint never comes

## The Hidden Damage

### Broken Trust
Once developers learn docs lie:
- Stop reading documentation
- Stop writing documentation
- Rely on tribal knowledge
- Newcomers struggle

### Integration Failures
External teams using docs:
- Build against fictional APIs
- Expect documented behavior
- Experience production failures
- Lose confidence

### Decision Paralysis
When docs can't be trusted:
- Every decision requires code archaeology
- Simple questions become investigations
- Development slows dramatically
- Fear of breaking unknown dependencies

## Current "Solutions" That Don't Work

### "Living Documentation"
- Still separate from code
- Still requires discipline
- Still drifts

### Generated Documentation
- Shows structure, not purpose
- Missing the "why"
- Can't document what should be
- Reflects code, including mistakes

### Documentation Tests
- Only test examples
- Can't test concepts
- Maintenance burden
- Often disabled when failing

### Documentation Sprints
- Batch updates increase drift time
- Context lost between coding and documenting
- Treats symptom, not cause

## The Trust Equation

Documentation value = Accuracy × Accessibility × Relevance

When accuracy approaches zero (through drift), value becomes zero regardless of other factors.

## The Deeper Problem

Documentation drift is a symptom of treating documentation as secondary to code. When we say "update the code and docs," we're admitting they're separate things that can diverge.

What if they weren't separate? What if documentation was the primary artifact, and code was just one implementation of that documentation?

## Related Seeds
- [code-knowledge-confusion](code-knowledge-confusion.md)
- [documentation-as-afterthought](documentation-as-afterthought.md)
- [trust-erosion-cycle](trust-erosion-cycle.md)