# AI Integration Pattern

## Intent
Enable AI partners to work effectively within the Organic Flow methodology by providing context, preserving state, and maintaining knowledge-first principles.

## Motivation
AI assistants without proper integration:
- Lose context between sessions
- Hallucinate or misremember progress
- Generate code without understanding
- Break flow with repetitive setup
- Work against natural patterns

Proper AI integration enables:
- Seamless context handoffs
- Knowledge-aware generation
- Flow state preservation
- Accurate temporal awareness
- Natural collaboration

## Structure
```
AI Integration Components:
├── Weather Context (current state)
├── Handoff Protocol (session continuity)
├── Knowledge References (source docs)
├── Temporal Grounding (timestamps)
└── Instruction Templates (methodology aware)
```

## Implementation

### 1. AI Instructions File
```markdown
# CLAUDE.md (or AI_INSTRUCTIONS.md)

## You are working in an Organic Flow project

### Core Principles
- Knowledge is primary, code is derivative
- We work in flow/* branches for exploration
- We harvest insights to docs/unprocessed/
- We generate code from understanding
- Everything has timestamps

### Workflow
1. Check weather.json for current context
2. Read referenced knowledge documents
3. Prioritize understanding over implementation
4. Document insights with timestamps
5. Reference source knowledge in code

### Current Project Structure
- docs/unprocessed/ - Knowledge accumulation
- implementation/current/ - Active work
- .flow/ - Temporary exploration (if exists)
- weather.json - Current context

### Important
- Never invent timestamps or claim false memories
- Always check file dates for temporal truth
- In flow branches: explore don't implement
- In impl branches: build from documented knowledge
```

### 2. Weather Context Integration
```json
{
  "timestamp": "2025-01-29T15:30:00Z",
  "phase": "flow",
  "branch": "flow/2025-01-29-auth-exploration",
  "current_focus": "JWT refresh token patterns",
  "last_action": "Discovered rotation prevents hijacking",
  "knowledge_refs": [
    "docs/unprocessed/2025-01-29-auth-analysis.md",
    "docs/unprocessed/2025-01-29-jwt-research.md"
  ],
  "next_suggested": "Document refresh strategy",
  "context_usage": "47%",
  "ai_reminders": [
    "We decided on 15-minute tokens",
    "Mobile app needs longer refresh"
  ]
}
```

### 3. Handoff Commands
```bash
#!/bin/bash
# sprout ai-handoff

echo "=== AI Context Handoff ==="
echo "Generated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
echo ""
echo "Read these files in order:"
echo "1. CLAUDE.md - Methodology and principles"
echo "2. weather.json - Current state"
echo ""

# Current branch context
BRANCH=$(git branch --show-current)
echo "Current branch: $BRANCH"

if [[ $BRANCH == flow/* ]]; then
    echo "Mode: EXPLORATION (knowledge gathering)"
    echo "Recent explorations:"
    ls -t docs/unprocessed/*.md | head -5
elif [[ $BRANCH == impl/* ]]; then
    echo "Mode: IMPLEMENTATION (building from knowledge)"
    echo "Implementation context:"
    cat implementation/current/context.md 2>/dev/null
fi

echo ""
echo "Latest insights:"
ls -t docs/unprocessed/*.md | head -3 | xargs head -20
```

### 4. AI-Aware Prompts

**For Flow Exploration:**
```markdown
We're exploring [topic] in branch flow/[name].
Current understanding in: docs/unprocessed/[latest].md

Help explore by:
- Asking clarifying questions
- Suggesting alternatives
- Identifying trade-offs
- Documenting uncertainties

Do NOT implement yet. Focus on understanding.
Update weather.json with insights discovered.
```

**For Implementation:**
```markdown
Implement [feature] based on knowledge in:
- docs/unprocessed/[decision].md
- docs/patterns/[pattern].md

Requirements from our exploration:
- [Specific constraint 1]
- [Specific constraint 2]

Generate code that:
- References source decisions in comments
- Follows our documented patterns
- Can be regenerated from knowledge
```

### 5. Temporal Verification
```bash
# AI claims something happened
AI: "As we implemented yesterday..."

# Verify with timestamps
grep -r "implementation" --include="*.md" docs/ | grep "2025-01-28"

# Correct the context
"Actually, we EXPLORED yesterday. Implementation started today at 14:30."
```

## Examples

### Context-Aware AI Session
```bash
$ sprout ai-context

=== Current Context for AI ===
Timestamp: 2025-01-29 16:45:00 UTC
Phase: flow (exploration)
Branch: flow/api-redesign
Focus: GraphQL vs REST trade-offs
Duration: 2.5 hours

Knowledge accumulated:
- docs/unprocessed/2025-01-29-api-pain-points.md
- docs/unprocessed/2025-01-29-graphql-benefits.md

Next: Harvest insights and decide

Copy above to AI for context.
```

### AI Handoff During Flow
```markdown
# Custom handoff for complex state

## Current Situation
We're deep in exploring authentication, but I discovered our 
assumptions about mobile app usage were wrong.

## Read in Order
1. docs/unprocessed/2025-01-29-original-auth-plan.md
2. docs/unprocessed/2025-01-29-mobile-discovery.md (line 47 is key)
3. Current exploration in .flow/auth-rethink.md

## Key Context
- We can't use 15-minute tokens (too short for mobile)
- But security requires short-lived access
- Exploring device-binding as compromise

## Continue From
The question at line 89 of .flow/auth-rethink.md
```

### AI-Generated Implementation
```typescript
/**
 * JWT Service Implementation
 * Generated from: docs/unprocessed/2025-01-29-jwt-decision.md
 * 
 * AI Generation Context:
 * - Timestamp: 2025-01-30 09:15:00 UTC
 * - Branch: impl/auth-jwt
 * - Based on 3 days of exploration
 * - Key constraints from knowledge:
 *   - 20-minute tokens (mobile compromise)
 *   - Device fingerprinting required
 *   - Refresh rotation mandatory
 */

// Implementation follows documented decisions...
```

## Consequences

### Benefits
- **Context preservation**: No repeated explanations
- **Accurate assistance**: AI grounded in reality
- **Flow protection**: AI respects current phase
- **Knowledge focus**: AI prioritizes understanding
- **Temporal accuracy**: No false memories

### Considerations
- Requires setup per project
- Context files need maintenance
- AI instructions may need tuning
- Handoff discipline required
- Model limitations still apply

### Signs of Good AI Integration
- Rarely need to re-explain context
- AI suggests phase-appropriate actions
- Generated code references knowledge
- Timestamps are always accurate
- Exploration stays exploratory

### Anti-patterns
- Starting fresh each session
- No temporal verification
- AI implementing during flow
- Missing knowledge references
- Believing AI "memories"

## Related Patterns
- [Weather Protocol](../protocols/weather-protocol.md) - Context state
- [Handoff Protocol](../protocols/handoff-protocol.md) - Session continuity
- [Temporal Integrity](../core/temporal-integrity.md) - Time accuracy
- [Knowledge First](../core/knowledge-first.md) - AI priorities