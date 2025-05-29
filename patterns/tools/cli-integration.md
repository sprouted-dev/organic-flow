# CLI Integration Pattern

## Intent
Provide simple command-line tools that support Organic Flow practices without imposing workflow, making common tasks effortless while preserving the methodology's flexibility.

## Motivation
Manual workflow steps create friction:
- Typing timestamps repeatedly
- Creating directory structures
- Managing git branches
- Updating context files
- Remembering conventions

CLI integration provides:
- One-command operations
- Consistent conventions
- Reduced cognitive load
- Faster flow transitions
- Preserved flexibility

## Structure
```
Sprout CLI Commands:
├── Flow Commands
│   ├── sprout flow start    # Begin exploration
│   ├── sprout flow harvest  # Extract knowledge
│   └── sprout flow status   # Current state
├── Context Commands
│   ├── sprout weather       # Show current context
│   ├── sprout handoff       # Generate AI handoff
│   └── sprout capture       # Quick knowledge capture
└── Implementation Commands
    ├── sprout impl start    # Begin building
    └── sprout impl link     # Link to knowledge
```

## Implementation

### 1. Flow Commands
```bash
#!/bin/bash
# sprout flow start <description>

flow_start() {
    local description="$1"
    local date=$(date +%Y-%m-%d)
    local timestamp=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
    local branch="flow/${date}-${description}"
    
    # Create flow branch
    git checkout -b "$branch"
    
    # Initialize flow directory
    mkdir -p .flow
    echo "# Flow Session: $description" > .flow/session.md
    echo "*Started: $timestamp*" >> .flow/session.md
    echo "" >> .flow/session.md
    
    # Update weather
    cat > weather.json << EOF
{
    "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "phase": "flow",
    "branch": "$branch",
    "current_focus": "$description",
    "session_start": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF
    
    echo "🌊 Flow session started: $description"
    echo "Branch: $branch"
    echo "Explore freely in .flow/"
}
```

```bash
# sprout flow harvest

flow_harvest() {
    local timestamp=$(date +%Y-%m-%d-%H%M%S)
    local date=$(date +%Y-%m-%d)
    local branch=$(git branch --show-current)
    
    if [[ ! $branch == flow/* ]]; then
        echo "❌ Not in a flow branch"
        return 1
    fi
    
    # Create harvest summary
    local harvest_file="docs/unprocessed/${timestamp}-harvest.md"
    mkdir -p docs/unprocessed
    
    cat > "$harvest_file" << EOF
# Harvest: ${branch#flow/}
*Harvested: $(date -u +"%Y-%m-%d %H:%M:%S UTC")*
*From branch: $branch*

## Session Summary
[Add session overview]

## Key Insights
[Extract main discoveries]

## Decisions Made
[Document any decisions]

## Open Questions
[List unresolved questions]

## Next Steps
[Suggest follow-up actions]
EOF
    
    # Archive flow directory
    if [ -d .flow ]; then
        mkdir -p ".flow/archives/$date"
        mv .flow/* ".flow/archives/$date/" 2>/dev/null || true
    fi
    
    # Commit harvest
    git add docs/unprocessed/
    git add .flow/archives/
    git commit -m "Harvest: ${branch#flow/} insights"
    
    echo "🌾 Harvested to: $harvest_file"
    echo "📝 Edit the harvest summary, then push"
    $EDITOR "$harvest_file"
}
```

### 2. Context Commands
```bash
# sprout weather

show_weather() {
    if [ ! -f weather.json ]; then
        echo "🌤️  No weather data found"
        return 1
    fi
    
    echo "🌤️  Current Weather"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Parse and display weather.json nicely
    cat weather.json | jq -r '
        "Phase:        \(.phase)",
        "Branch:       \(.branch)",
        "Focus:        \(.current_focus)",
        "Started:      \(.session_start)",
        if .context_usage then "Context:      \(.context_usage)" else empty end
    '
    
    # Show recent unprocessed files
    echo ""
    echo "Recent insights:"
    ls -t docs/unprocessed/*.md 2>/dev/null | head -3 | while read f; do
        echo "  - $(basename "$f")"
    done
}
```

```bash
# sprout capture "Quick insight about caching"

quick_capture() {
    local insight="$1"
    local timestamp=$(date +%Y-%m-%d-%H%M%S)
    local file="docs/unprocessed/${timestamp}-capture.md"
    
    mkdir -p docs/unprocessed
    
    cat > "$file" << EOF
# Quick Capture
*Captured: $(date -u +"%Y-%m-%d %H:%M:%S UTC")*
*Branch: $(git branch --show-current)*

$insight
EOF
    
    # Auto-commit if in flow branch
    if [[ $(git branch --show-current) == flow/* ]]; then
        git add "$file"
        git commit -m "Capture: $insight" --no-verify
    fi
    
    echo "💡 Captured to: $file"
}
```

### 3. Implementation Commands
```bash
# sprout impl start <name> <knowledge-ref>

impl_start() {
    local name="$1"
    local knowledge_ref="$2"
    local branch="impl/$name"
    
    git checkout -b "$branch"
    
    # Create implementation context
    mkdir -p implementation/current
    cat > implementation/current/context.md << EOF
# Implementation: $name
*Started: $(date -u +"%Y-%m-%d %H:%M:%S UTC")*
*Branch: $branch*

## Based on Knowledge
- $knowledge_ref
- [Add other references]

## Implementation Goals
[What we're building]

## Constraints
[From our knowledge/decisions]

## Success Criteria
[How we know it's done]
EOF
    
    # Update weather
    update_weather "implementation" "$name"
    
    echo "🔨 Implementation started: $name"
    echo "📚 Based on: $knowledge_ref"
    echo "Edit: implementation/current/context.md"
}
```

### 4. Utility Functions
```bash
# Auto-update weather.json
update_weather() {
    local phase="$1"
    local focus="$2"
    
    if [ -f weather.json ]; then
        # Update existing weather
        cat weather.json | jq \
            --arg phase "$phase" \
            --arg focus "$focus" \
            --arg ts "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
            '.phase = $phase | .current_focus = $focus | .timestamp = $ts' \
            > weather.json.tmp
        mv weather.json.tmp weather.json
    else
        # Create new weather
        create_weather "$phase" "$focus"
    fi
}

# Check for long-running sessions
check_session_duration() {
    if [ -f weather.json ]; then
        local start=$(cat weather.json | jq -r '.session_start')
        local duration=$(calculate_duration "$start")
        
        if [ "$duration" -gt 120 ]; then
            echo "⏰ Long session detected (>2 hours)"
            echo "   Consider harvesting soon"
        fi
    fi
}
```

## Examples

### Complete Flow Cycle
```bash
# Start exploration
$ sprout flow start auth-research
🌊 Flow session started: auth-research
Branch: flow/2025-01-29-auth-research
Explore freely in .flow/

# Work freely, capture insights
$ sprout capture "JWT might solve our stateless needs"
💡 Captured to: docs/unprocessed/2025-01-29-143022-capture.md

# Check status
$ sprout weather
🌤️  Current Weather
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase:        flow
Branch:       flow/2025-01-29-auth-research  
Focus:        auth-research
Started:      2025-01-29T14:00:00Z

# Harvest when ready
$ sprout flow harvest
🌾 Harvested to: docs/unprocessed/2025-01-29-160000-harvest.md
📝 Edit the harvest summary, then push
```

### Quick Implementation
```bash
# After knowledge crystallizes
$ sprout impl start jwt-auth docs/unprocessed/2025-01-29-auth-decision.md
🔨 Implementation started: jwt-auth
📚 Based on: docs/unprocessed/2025-01-29-auth-decision.md
Edit: implementation/current/context.md

# Build with confidence
$ npm test
$ git add src/
$ git commit -m "Implement JWT from auth decision doc"
```

## Consequences

### Benefits
- **Workflow fluidity**: Single commands for complex operations
- **Convention enforcement**: Consistent structure automatically
- **Reduced friction**: No manual timestamp/branch management
- **Discoverability**: Commands guide the workflow
- **Flexibility preserved**: Still just git and files underneath

### Considerations
- Requires installation/setup
- Team needs training on commands
- May hide what's happening
- Could become a crutch
- Needs maintenance

### Design Principles
1. **Do one thing well**: Each command has clear purpose
2. **Show your work**: Display what was created/changed
3. **Stay simple**: Avoid complex flags/options
4. **Be helpful**: Guide next steps
5. **Preserve flexibility**: Never lock users in

## Related Patterns
- [Flow Branches](../workflow/flow-branches.md) - What CLI automates
- [Harvest Protocol](../workflow/harvest-protocol.md) - Harvest command
- [Weather Protocol](../protocols/weather-protocol.md) - Context tracking
- [AI Integration](ai-integration.md) - Handoff generation