# Handoff Protocol Pattern

## Intent
Enable seamless context transfer between development sessions, whether handing off to an AI assistant, a teammate, or your future self, preserving momentum and understanding.

## Motivation
Context loss during handoffs causes:
- Repeated explanations
- Lost train of thought
- Missed critical details
- Broken momentum
- Frustrating restarts

Effective handoffs provide:
- Complete context transfer
- Clear next steps
- Preserved insights
- Maintained momentum
- Confident continuation

## Structure
```
Handoff Components:
├── Current State (weather.json)
├── Recent History (chronological docs)
├── Active Focus (what we're doing)
├── Key Context (critical knowledge)
└── Next Actions (where to continue)
```

## Implementation

### 1. Default Handoff Template
```markdown
# Context Handoff
*Generated: 2025-01-29 16:00:00 UTC*

## Read These Files (in order)
1. `CLAUDE.md` - How we work here
2. `weather.json` - Current state
3. `docs/unprocessed/2025-01-29-latest.md` - Most recent insights
4. `implementation/current/context.md` - If implementing

## Current Situation
- Phase: [flow/implementation/harvest]
- Branch: [current git branch]
- Focus: [what we're working on]
- Duration: [how long in this session]

## Key Context
[Critical information needed to continue]

## Recent Progress
[What was just accomplished]

## Continue From Here
[Specific next step or question]
```

### 2. Automated Handoff Generation
```bash
#!/bin/bash
# sprout handoff

generate_handoff() {
    local timestamp=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
    local branch=$(git branch --show-current)
    local weather=$(cat weather.json 2>/dev/null || echo "{}")
    
    cat << EOF
# Context Handoff
*Generated: $timestamp*

## Read These Files (in order)
1. \`CLAUDE.md\` - How we work here
2. \`weather.json\` - Current state
EOF

    # Add recent unprocessed files
    echo "3. Recent insights:"
    ls -t docs/unprocessed/*.md 2>/dev/null | head -3 | while read f; do
        echo "   - \`$f\`"
    done
    
    # Add implementation context if relevant
    if [[ $branch == impl/* ]] && [ -f implementation/current/context.md ]; then
        echo "4. \`implementation/current/context.md\` - Implementation plan"
    fi
    
    echo ""
    echo "## Current Situation"
    echo "$weather" | jq -r '
        "- Phase: \(.phase)",
        "- Branch: '"$branch"'",
        "- Focus: \(.current_focus)",
        "- Started: \(.session_start)"
    '
    
    # Add specific guidance based on phase
    local phase=$(echo "$weather" | jq -r '.phase')
    case "$phase" in
        "flow")
            echo ""
            echo "## Continue Exploring"
            echo "We're in discovery mode. Key questions:"
            echo "$weather" | jq -r '.exploration_threads[]? | "- " + .'
            ;;
        "implementation")
            echo ""
            echo "## Continue Building"
            echo "Implementing based on:"
            echo "$weather" | jq -r '.implementing_from[]? | "- " + .'
            ;;
    esac
}
```

### 3. Custom Handoff Override
```markdown
# .weather/custom_handoff.md

## 🚨 Special Context Required

We're in the middle of a complex refactor that touches 
authentication across the entire system.

### Read in This Exact Order
1. `docs/decisions/old-auth-system.md` - What we're replacing
2. `docs/unprocessed/2025-01-29-auth-pain-points.md` - Why
3. `flow/current-refactor-plan.md` - The approach
4. Look at line 234 in `src/auth/provider.ts` - THE PROBLEM

### Current Situation
We discovered the auth provider has a race condition 
that only appears under load. The obvious fix breaks 
backward compatibility.

### Key Decision Needed
Do we:
A) Break compatibility and fix properly
B) Hack around it and plan migration
C) Something else?

### Continue From
The comment at line 234. Everything hinges on this.
```

### 4. Phase-Specific Handoffs

**Flow to Harvest Handoff:**
```markdown
## Ready for Harvest

You've been exploring for 3 hours. Energy is depleting.

### What You Discovered
- JWT refresh rotation is essential
- Mobile needs longer token life
- Device binding might be the answer

### Harvest These Insights
1. Create summary in docs/unprocessed/
2. Focus on the mobile token lifetime issue
3. Document the device binding idea
4. Note questions about revocation

### Then
Archive .flow/ and rest. This was good work.
```

**Harvest to Implementation Handoff:**
```markdown
## Ready to Build

Knowledge has crystallized sufficiently.

### Build From
- Decision: `docs/unprocessed/2025-01-29-jwt-decision.md`
- Pattern: `docs/patterns/token-rotation.md`
- Constraints: 20-minute tokens (not 15)

### Implementation Branch
`git checkout -b impl/jwt-auth`

### Start With
The JWT service class. Reference the decision doc.
```

### 5. Team Handoffs
```markdown
## Team Handoff: Sarah → Marcus

Sarah explored API redesign for 2 days.
Marcus will implement the GraphQL layer.

### Sarah's Key Insights
1. REST is fighting our domain model
2. GraphQL aligns naturally with our tree structure
3. Caching becomes simpler with GraphQL

### For Marcus
- Start with `docs/unprocessed/2025-01-29-graphql-decision.md`
- The schema draft is in `flow/schema-sketch.graphql`
- Main concern: Real-time subscriptions

### Questions for Sync
- How do we handle auth in GraphQL context?
- Should we version the schema from day 1?
```

## Examples

### AI Session Handoff
```bash
$ sprout handoff

# Context Handoff
*Generated: 2025-01-29 16:00:00 UTC*

## Read These Files (in order)
1. `CLAUDE.md` - How we work here
2. `weather.json` - Current state
3. Recent insights:
   - `docs/unprocessed/2025-01-29-performance-fix.md`
   - `docs/unprocessed/2025-01-29-cache-strategy.md`

## Current Situation
- Phase: implementation
- Branch: impl/caching
- Focus: Redis cache layer
- Started: 2025-01-29T14:00:00Z

## Continue Building
Implementing based on:
- docs/unprocessed/2025-01-29-cache-strategy.md

Next: Implement cache invalidation logic
```

### End of Day Handoff
```markdown
# EOD Handoff
*2025-01-29 17:30:00*

## Today's Progress
- Explored authentication for 3 hours
- Discovered JWT refresh rotation pattern
- Decided on 20-minute tokens
- Started implementation branch

## Tomorrow Morning
1. Review `docs/unprocessed/2025-01-29-jwt-decision.md`
2. Continue in `impl/jwt-auth` branch
3. Start with refresh token logic
4. Remember: Device binding is key

## Left Off
Middle of implementing JWTService.generateTokenPair()
The refresh token needs rotation logic added.

Good night! 🌙
```

## Consequences

### Benefits
- **Seamless continuation**: Pick up exactly where left off
- **Context preservation**: Nothing lost between sessions
- **Reduced friction**: No "where was I?" moments
- **Better collaboration**: Clear team handoffs
- **AI effectiveness**: Grounded assistance

### Considerations
- Requires discipline to create
- Can become stale quickly
- Need to balance detail
- Custom vs automated
- Time investment

### Good Handoff Practices
1. **Be specific**: Exact files and line numbers
2. **Show order**: What to read first
3. **State clearly**: What's happening now
4. **Guide next**: Where to continue
5. **Include why**: Context for decisions

### Handoff Triggers
- End of session
- Context switch
- Team rotation
- AI assistance needed
- Break/interruption
- Energy depletion

## Related Patterns
- [Weather Protocol](weather-protocol.md) - Current state
- [AI Integration](../tools/ai-integration.md) - AI handoffs
- [Temporal Integrity](../core/temporal-integrity.md) - Time context
- [Knowledge Lineage](../structure/knowledge-lineage.md) - Knowledge refs