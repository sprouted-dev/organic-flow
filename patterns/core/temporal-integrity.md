# Temporal Integrity Pattern

## Intent
Maintain absolute truth about when things happened to prevent confusion, enable accurate reconstruction, and keep AI partners grounded in reality.

## Motivation
Without temporal integrity:
- AI partners confidently "remember" things that didn't happen
- Order of discoveries gets confused
- Context age becomes unclear
- Progress seems faster or slower than reality
- Knowledge evolution gets muddled

With temporal integrity:
- Every insight has a birthdate
- Evolution of understanding is traceable
- AI hallucinations are checkable
- Real progress is measurable
- Context freshness is known

As discovered: "Partners have vivid imaginations and can't be trusted :) great story tellers"

## Structure
```
Every artifact includes:
├── Timestamp (when created/modified)
├── Session context (what flow/implementation)
├── Order markers (sequence of events)
└── Duration tracking (how long things took)
```

## Implementation

### 1. Timestamp Everything
```markdown
# Authentication Decision
*Captured: 2025-01-29 14:30:22 UTC*
*Session: flow/auth-exploration*
*Duration: 45 minutes exploration*

Decision: Use JWT with refresh rotation
```

### 2. Use Timestamps in Filenames
```bash
# Flow branches
git checkout -b flow/2025-01-29-auth-exploration

# Unprocessed files
docs/unprocessed/2025-01-29-143022-jwt-decision.md

# Archive directories
.flow/archives/2025-01-29/

# Session directories
implementation/sessions/2025-01-29-afternoon/
```

### 3. Track Context in Weather
```json
{
  "timestamp": "2025-01-29T14:30:22Z",
  "session_start": "2025-01-29T13:45:00Z",
  "phase": "flow",
  "branch": "flow/2025-01-29-auth-exploration",
  "events": [
    {
      "time": "2025-01-29T13:45:00Z",
      "event": "Started exploration"
    },
    {
      "time": "2025-01-29T14:15:00Z",
      "event": "Discovered JWT rotation pattern"
    }
  ]
}
```

### 4. Temporal Verification
```bash
# AI claims: "We implemented this yesterday"
# Verify: 
grep -r "implementation" --include="*.md" | grep "2025-01-28"
# Reality: No implementation files from yesterday

# Truth: "We EXPLORED this yesterday, implementation today"
```

## Examples

### Preventing AI Hallucinations
```markdown
AI: "As we discussed in the morning session..."
Developer: *Checks timestamps*
Reality: Morning session was about databases, not auth
Correction: "That was yesterday afternoon, today we're on databases"
```

### Tracking Evolution
```bash
# See how understanding evolved
ls docs/unprocessed/ | sort
2025-01-27-initial-auth-thoughts.md
2025-01-28-jwt-exploration.md  
2025-01-29-refresh-token-pattern.md
2025-01-29-final-auth-decision.md

# Clear progression of understanding
```

### Session Reconstruction
```markdown
# Full context from timestamps
Morning (09:00-10:30): Explored authentication options
Break (10:30-11:00): Insights during coffee
Late Morning (11:00-12:15): Discovered rotation pattern
Afternoon (14:00-15:30): Documented decision
```

## Consequences

### Benefits
- **AI grounding**: Can verify claims against timestamps
- **Progress tracking**: Real velocity, not imagined
- **Context freshness**: Know when knowledge was captured
- **Evolution visible**: See how understanding grew
- **Debugging aid**: When did this decision happen?

### Considerations
- Requires discipline to timestamp
- Timezone awareness important
- Storage includes more metadata
- Scripts should auto-timestamp
- Team needs synchronized clocks

### Temporal Integrity Checklist
- [ ] Every file has creation timestamp
- [ ] Decisions include capture time
- [ ] Weather.json always current
- [ ] Branch names include dates
- [ ] Session directories timestamped
- [ ] Timezone specified (prefer UTC)

### Red Flags (Lost Integrity)
- Undated documents
- "Recently" without specifics
- AI confident about wrong timeline
- Can't trace when decision made
- Progress seems impossible

## Related Patterns
- [Weather Protocol](../protocols/weather-protocol.md) - Temporal context
- [Harvest Protocol](../workflow/harvest-protocol.md) - Time-based archives
- [AI Integration](../tools/ai-integration.md) - Grounding AI in time
- [Knowledge First](knowledge-first.md) - Knowledge includes when