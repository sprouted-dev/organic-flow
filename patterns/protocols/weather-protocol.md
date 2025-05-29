# Weather Protocol Pattern

## Intent
Maintain a lightweight, persistent context state that preserves current focus, enables smooth handoffs between sessions, and provides truth about the development environment.

## Motivation
Context loss between sessions causes:
- Repeated explanations to AI
- Forgotten current focus
- Lost momentum
- Unclear next steps
- Temporal confusion

The Weather Protocol provides:
- Single source of current truth
- Instant context awareness
- Smooth session continuity
- Clear next actions
- Temporal grounding

## Structure
```json
{
  "timestamp": "ISO 8601 timestamp",
  "phase": "current phase",
  "branch": "current git branch",
  "current_focus": "what we're working on",
  "session_start": "when this session began",
  "last_action": "what just happened",
  "next_suggested": "what to do next",
  "knowledge_refs": ["relevant documents"],
  "context_usage": "AI context percentage",
  "custom_fields": "phase-specific data"
}
```

## Implementation

### 1. Weather File Location
```bash
# Always at project root
project/
├── weather.json         # Current weather
├── weather.history.log  # Optional history
└── .gitignore          # Include weather.json
```

### 2. Basic Weather Structure
```json
{
  "timestamp": "2025-01-29T15:30:00Z",
  "phase": "flow",
  "branch": "flow/2025-01-29-auth-exploration",
  "current_focus": "Exploring JWT refresh patterns",
  "session_start": "2025-01-29T14:00:00Z",
  "last_action": "Discovered rotation prevents hijacking",
  "next_suggested": "Document refresh strategy",
  "knowledge_refs": [
    "docs/unprocessed/2025-01-29-auth-analysis.md",
    "docs/unprocessed/2025-01-29-jwt-patterns.md"
  ]
}
```

### 3. Phase-Specific Weather

**Flow Phase Weather:**
```json
{
  "timestamp": "2025-01-29T15:30:00Z",
  "phase": "flow",
  "branch": "flow/api-redesign",
  "current_focus": "GraphQL vs REST exploration",
  "session_start": "2025-01-29T13:00:00Z",
  "energy_level": "high",
  "insights_captured": 3,
  "exploration_threads": [
    "Performance implications",
    "Client complexity",
    "Caching strategies"
  ],
  "next_suggested": "Explore caching patterns"
}
```

**Implementation Phase Weather:**
```json
{
  "timestamp": "2025-01-30T10:00:00Z",
  "phase": "implementation",
  "branch": "impl/jwt-auth",
  "current_focus": "Building JWT service",
  "session_start": "2025-01-30T09:00:00Z",
  "implementing_from": [
    "docs/unprocessed/2025-01-29-jwt-decision.md"
  ],
  "progress": {
    "jwt_service": "complete",
    "refresh_logic": "in_progress",
    "tests": "pending"
  },
  "next_suggested": "Complete refresh token rotation"
}
```

### 4. Weather Updates
```bash
#!/bin/bash
# Update weather atomically

update_weather() {
    local field="$1"
    local value="$2"
    local timestamp=$(date -u +%Y-%m-%dT%H:%M:%SZ)
    
    # Read current weather
    if [ -f weather.json ]; then
        current=$(cat weather.json)
    else
        current="{}"
    fi
    
    # Update fields
    updated=$(echo "$current" | jq \
        --arg field "$field" \
        --arg value "$value" \
        --arg ts "$timestamp" \
        '.[$field] = $value | .timestamp = $ts')
    
    # Write atomically
    echo "$updated" > weather.json.tmp
    mv weather.json.tmp weather.json
    
    # Log history if enabled
    if [ -f weather.history.log ]; then
        echo "[$timestamp] $field: $value" >> weather.history.log
    fi
}
```

### 5. Weather Reading
```bash
# Quick weather check
$ cat weather.json | jq -r '
    "Phase: \(.phase)",
    "Focus: \(.current_focus)",
    "Since: \(.session_start)"
'

Phase: flow
Focus: Exploring JWT refresh patterns
Since: 2025-01-29T14:00:00Z
```

### 6. AI Handoff Integration
```markdown
# Generated Handoff includes Weather

## Current Context
Based on weather.json:
- Phase: flow (exploration mode)
- Branch: flow/auth-exploration
- Focus: JWT refresh patterns
- Working since: 2pm (1.5 hours)
- Last insight: Rotation prevents hijacking

Continue exploring refresh strategies...
```

## Examples

### Morning Start
```json
{
  "timestamp": "2025-01-30T09:00:00Z",
  "phase": "planning",
  "branch": "main",
  "current_focus": "Reviewing overnight insights",
  "session_start": "2025-01-30T09:00:00Z",
  "last_action": "Read team messages",
  "next_suggested": "Process unprocessed directory",
  "energy_state": "warming_up"
}
```

### Mid-Flow Checkpoint
```json
{
  "timestamp": "2025-01-30T11:30:00Z",
  "phase": "flow",
  "branch": "flow/performance-investigation",
  "current_focus": "N+1 query problem",
  "session_start": "2025-01-30T10:00:00Z",
  "last_action": "Found problematic query pattern",
  "next_suggested": "Test DataLoader solution",
  "context_usage": "62%",
  "breakthrough": true,
  "key_insight": "Eager loading won't scale"
}
```

### End of Day
```json
{
  "timestamp": "2025-01-30T17:30:00Z",
  "phase": "harvest",
  "branch": "flow/performance-investigation",
  "current_focus": "Summarizing findings",
  "session_start": "2025-01-30T17:00:00Z",
  "last_action": "Created harvest summary",
  "next_suggested": "Push branch and create PR",
  "ready_for": "weekend",
  "monday_reminder": "Implement DataLoader pattern"
}
```

## Consequences

### Benefits
- **Instant orientation**: Know where you are
- **Context preservation**: Never lose state
- **AI grounding**: Accurate assistance
- **Team visibility**: Others can see state
- **Historical tracking**: Optional logging

### Considerations
- Keep it lightweight
- Don't over-structure
- Update regularly
- Include in .gitignore
- Handle concurrent updates

### Weather Hygiene
1. **Update on phase changes**: Always
2. **Update on insights**: When significant
3. **Update on confusion**: Clarify focus
4. **Update before breaks**: Preserve state
5. **Update for handoffs**: Help AI/teammates

### Anti-patterns
- Stale weather (hours old)
- Too much detail
- Forgetting to update
- Complex nested structures
- Including code snippets

## Related Patterns
- [AI Integration](../tools/ai-integration.md) - Weather consumption
- [Handoff Protocol](handoff-protocol.md) - Session continuity
- [CLI Integration](../tools/cli-integration.md) - Weather updates
- [Temporal Integrity](../core/temporal-integrity.md) - Timestamp accuracy