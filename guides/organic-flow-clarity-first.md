# Organic Flow: Clarity-First Development

*Created: 2025-07-29*
*Context: Rethinking Organic Flow without metaphors, focusing on clear thinking*

## The Core Idea

Software development has a fundamental problem: we treat code as permanent and knowledge as temporary. This is backwards.

Code changes constantly. Knowledge - the understanding of problems, constraints, and solutions - is what endures. Organic Flow inverts the traditional relationship: **knowledge becomes primary, code becomes secondary**.

## What This Means in Practice

### Traditional Development
```
Write Code → Maybe Document → Knowledge Often Lost
```

### Knowledge-First Development  
```
Capture Input → Form Hypothesis → Experiment with Code → Extract Learning → Knowledge Persists
```

## The Simple Workflow

### 1. Capture Inputs
Anything that sparks development:
- Problems: "Users are losing their work"
- Ideas: "What if we cached everything?"
- Feedback: "The app feels slow lately"
- Observations: "This pattern worked in another project"

### 2. Form Hypotheses
Before coding, state what you think will work:
```markdown
## Hypothesis: Extend Session Timeout

If we extend sessions from 30 minutes to 4 hours,
then users won't lose their work,
assuming our infrastructure can handle the memory load.
```

### 3. Experiment in Branches
- Create `experiment/session-timeout-4hr` for quick test
- Or `impl/session-management` for larger feature
- Implement the solution
- Test your assumptions
- Discover reality

### 4. Extract Knowledge
What actually happened?
```markdown
## Learning: Session Timeout Experiment

**Result**: Failed - Redis ran out of memory

**Discovered**:
- Each session uses ~2MB of memory
- 90% of users are active for less than 1 hour  
- The real problem wasn't timeout length but lack of auto-save

**New Understanding**:
Don't solve the obvious problem, solve the real problem.
```

### 5. Apply Learning
- Update requirements with evidence
- Document newly discovered constraints
- Inform the next experiment

## Why This Works

### Knowledge Compounds
Each experiment builds on previous learnings. Failed experiments often produce the most valuable insights.

### Clear Thinking Produces Clear Code
When you can explain the problem conversationally, the solution often becomes obvious.

### Nothing Is Lost
When developers leave or code gets rewritten, the accumulated understanding remains.

## Real Example: The Session Story

**Monday - The Problem**
```markdown
Sarah from support reports: "Users are losing hours of work when they get 
logged out. It's our #1 complaint." #problem:data-loss
```

**Tuesday - The Hypothesis**
```markdown
We think: If we extend the session timeout to 4 hours, users won't lose work.
Assumption: Our Redis instance can handle longer sessions. #hypothesis:extend-timeout
```

**Wednesday - The Experiment**
```bash
git checkout -b experiment/4hr-sessions
# Quick test: just change the timeout value
# Change timeout, deploy to staging
```

**Thursday - Reality Hits**
```markdown
Redis crashed at 3am. Memory usage: 80GB for 10k users.
Math: 10k users × 2MB × 4 hours = 80GB #limit:redis-memory

Also discovered: 90% of sessions last < 1 hour. We're solving 
for the wrong problem. #insight:usage-pattern
```

**Friday - The Real Solution**
```markdown
New hypothesis: Auto-save every 30 seconds prevents data loss 
without infrastructure changes. #hypothesis:auto-save

This worked! Real problem was losing work, not session length.
#pattern:question-assumptions
```

## The Key Shift

Instead of asking "What code should I write?", ask:
1. What problem am I really solving?
2. What am I assuming to be true?
3. How will I know if it works?
4. What can others learn from this attempt?

## Branch Types: Experiment vs Implementation

Both `experiment/` and `impl/` branches are for testing ideas - they differ in scope and intent:

### experiment/ branches
- **Purpose**: Quick, focused tests of specific hypotheses
- **Timeline**: Hours to days
- **Scope**: Single idea or assumption
- **Example**: "Will caching improve search speed?"

### impl/ branches  
- **Purpose**: Build features with intent to ship
- **Timeline**: Days to weeks
- **Scope**: Multiple integrated patterns
- **Example**: "Build complete search system with caching, indexing, and UI"
- **Note**: Can spawn their own experiments

Both produce knowledge through Knowledge PRs. The difference is that successful `impl/` branches can become `release/` branches.

## Starting Today

You don't need special tools. Just:

1. **Before coding**: Write down what you're trying to solve
2. **During coding**: Note surprises and discoveries  
3. **After coding**: Extract what you learned via Knowledge PR
4. **Always**: Share patterns that others can use

## The Payoff

- **For You**: Never solve the same problem twice
- **For Your Team**: Build on collective understanding
- **For Your Future**: Code can be regenerated from knowledge
- **For Your Organization**: Institutional memory that actually works

## Remember

Clear thinking produces clear code. Document the thinking, and the code becomes obvious.

The code is temporary. The understanding is forever.