# Phase Protocol Pattern

## Intent
Define clear phases of work that respect natural creative rhythms while providing structure for transitions and appropriate activities for each phase.

## Motivation
Unstructured work leads to:
- Mixing exploration with building
- Premature implementation
- Lost insights during coding
- Forced productivity
- Unclear transitions

Clear phases provide:
- Appropriate activities for energy
- Protected exploration time
- Clean transitions
- Natural rhythm support
- Clear expectations

## Structure
```
Organic Flow Phases:
├── Flow Phase (exploration)
├── Harvest Phase (knowledge extraction)
├── Planning Phase (organization)
└── Implementation Phase (building)

Natural Transitions:
Flow → Harvest → Planning → Implementation → Flow
```

## Implementation

### 1. Phase Definitions

**Flow Phase**
```yaml
phase: flow
purpose: "Unrestricted exploration and discovery"
activities:
  - Research and learning
  - Experimentation
  - Pattern recognition
  - Question formation
  - Creative connections
outputs:
  - Raw insights in .flow/
  - Questions raised
  - Patterns noticed
  - Connections made
indicators:
  - High creative energy
  - Curiosity driven
  - No pressure for completion
```

**Harvest Phase**
```yaml
phase: harvest
purpose: "Extract value from exploration"
activities:
  - Review flow outputs
  - Identify key insights
  - Document decisions
  - Summarize learnings
  - Archive raw content
outputs:
  - Summaries in docs/unprocessed/
  - Archived flow sessions
  - Cleaned workspace
  - Clear next steps
indicators:
  - Flow energy depleted
  - Insights need capture
  - Patterns emerged
```

**Planning Phase**
```yaml
phase: planning
purpose: "Organize and prioritize"
activities:
  - Review unprocessed knowledge
  - Identify implementation needs
  - Set priorities
  - Define constraints
  - Create implementation context
outputs:
  - Implementation plans
  - Prioritized tasks
  - Clear specifications
  - Success criteria
indicators:
  - Knowledge crystallized
  - Ready to build
  - Clear direction
```

**Implementation Phase**
```yaml
phase: implementation
purpose: "Build from understanding"
activities:
  - Generate code from knowledge
  - Follow documented decisions
  - Create tests
  - Document as needed
outputs:
  - Working code
  - Tests
  - Implementation notes
  - Updated documentation
indicators:
  - Clear requirements
  - Knowledge-based building
  - Focused execution
```

### 2. Phase Transitions
```bash
#!/bin/bash
# Natural phase transitions

transition_phase() {
    local from_phase="$1"
    local to_phase="$2"
    
    case "$from_phase-$to_phase" in
        "flow-harvest")
            echo "📝 Time to harvest insights"
            echo "Review .flow/ directory"
            echo "Create summaries in docs/unprocessed/"
            ;;
        "harvest-planning")
            echo "📋 Time to plan"
            echo "Review harvested knowledge"
            echo "Identify what to implement"
            ;;
        "planning-implementation")
            echo "🔨 Time to build"
            echo "Create impl/ branch"
            echo "Reference knowledge docs"
            ;;
        "implementation-flow")
            echo "🌊 Time to explore"
            echo "What questions emerged?"
            echo "What patterns did you notice?"
            ;;
    esac
    
    update_weather "phase" "$to_phase"
}
```

### 3. Phase-Appropriate Activities

**Flow Phase Activities:**
```markdown
✅ DO in Flow:
- Follow curiosity
- Ask "what if?"
- Try wild ideas
- Make connections
- Document thoughts
- Explore tangents

❌ DON'T in Flow:
- Write production code
- Worry about quality
- Force conclusions
- Judge ideas
- Organize prematurely
```

**Implementation Phase Activities:**
```markdown
✅ DO in Implementation:
- Reference decisions
- Follow patterns
- Write clean code
- Create tests
- Stay focused

❌ DON'T in Implementation:
- Explore new ideas
- Question decisions
- Change requirements
- Add unplanned features
- Skip documentation
```

### 4. Phase Recognition
```python
def suggest_phase_transition(metrics):
    """Suggest when to transition phases"""
    
    current_phase = metrics.current_phase
    
    if current_phase == "flow":
        if metrics.session_duration > 2.5 * HOURS:
            return "Consider harvest - long session"
        if metrics.energy_level < 0.3:
            return "Energy low - harvest time?"
        if metrics.insights_captured > 10:
            return "Many insights - ready to harvest?"
    
    elif current_phase == "implementation":
        if metrics.questions_raised > 5:
            return "Many questions - need flow session?"
        if metrics.blocked_duration > 30 * MINUTES:
            return "Blocked - explore alternatives?"
    
    return None
```

### 5. Weather Integration
```json
{
  "timestamp": "2025-01-29T15:30:00Z",
  "phase": "flow",
  "phase_start": "2025-01-29T14:00:00Z",
  "phase_energy": "high",
  "phase_progress": {
    "insights_captured": 5,
    "patterns_noticed": 2,
    "questions_raised": 8
  },
  "phase_indicators": {
    "ready_for_harvest": false,
    "energy_depleting": false,
    "breakthrough_near": true
  }
}
```

## Examples

### Natural Phase Cycle
```bash
# Monday morning - Planning
$ sprout phase planning
📋 Entering planning phase
Reviewing weekend insights...

# See what to implement
$ ls docs/unprocessed/
2025-01-26-api-decision.md
2025-01-27-cache-strategy.md

# Transition to implementation
$ sprout phase implementation
🔨 Entering implementation phase
Create impl branch for chosen work

# Hit a question during implementation
$ sprout phase flow
🌊 Entering flow phase
Explore the question that arose

# End of day harvest
$ sprout phase harvest
📝 Entering harvest phase
Capture today's learnings
```

### Phase Mismatch Detection
```markdown
# Weather Chaser Observation
*2025-01-29 15:00:00*

Phase mismatch detected:
- Current phase: implementation
- Activity pattern: heavy exploration
- Files created in .flow/
- Many questions in comments

Suggestion: Consider switching to flow phase?
```

## Consequences

### Benefits
- **Natural rhythm**: Work with energy, not against
- **Protected exploration**: Flow without pressure
- **Clear expectations**: Know what's appropriate
- **Better results**: Right activity for phase
- **Sustainable pace**: Natural transitions

### Considerations
- Not rigid timeboxes
- Respect natural transitions
- May conflict with deadlines
- Requires self-awareness
- Team coordination needed

### Phase Health Indicators

**Healthy Phase Usage:**
- Natural transitions
- Appropriate durations
- Clear outputs
- Energy alignment
- Smooth cycles

**Unhealthy Patterns:**
- Forced transitions
- Skipping harvest
- Endless flow
- Implementation during exploration
- Ignoring energy

### Phase Duration Guidelines
- **Flow**: 1-4 hours typically
- **Harvest**: 20-60 minutes
- **Planning**: 30-90 minutes
- **Implementation**: 2-6 hours

But always follow energy over clock!

## Related Patterns
- [Organic Development](../core/organic-development.md) - Phase philosophy
- [Flow Branches](../workflow/flow-branches.md) - Flow phase practice
- [Harvest Protocol](../workflow/harvest-protocol.md) - Harvest phase
- [Weather Protocol](weather-protocol.md) - Phase tracking