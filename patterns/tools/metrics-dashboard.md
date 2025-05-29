# Metrics Dashboard Pattern

## Intent
Provide visual insights into development patterns and flow states through a real-time dashboard that reveals rather than judges, helping developers understand their natural rhythms.

## Motivation
Traditional metrics focus on output:
- Lines of code written
- Tickets closed
- Commits per day
- Code coverage
- Velocity points

Organic Flow metrics focus on understanding:
- Flow session patterns
- Knowledge accumulation
- Energy rhythms
- Harvest quality
- Natural cycles

The dashboard should:
- Reveal patterns, not impose them
- Show trends, not judgments
- Inspire curiosity, not competition
- Support self-awareness
- Respect privacy

## Structure
```
Weather Station Dashboard:
├── Current Weather (real-time state)
├── Flow Patterns (session analysis)
├── Knowledge Growth (accumulation trends)
├── Energy Rhythms (temporal patterns)
└── Custom Views (developer-defined)
```

## Implementation

### 1. Core Metrics Collection
```go
// weather-station/metrics.go

type FlowMetrics struct {
    SessionStart    time.Time
    SessionEnd      *time.Time
    Branch          string
    KnowledgeFiles  int
    EditsCount      int
    EnergyPattern   []EnergyPoint
}

type KnowledgeMetrics struct {
    Date            time.Time
    FilesAdded      int
    InsightsCaptured int
    PatternsFound   int
    ConnectionsMade int
}

func CollectMetrics(projectPath string) {
    // Track flow sessions
    if branch := getCurrentBranch(); strings.HasPrefix(branch, "flow/") {
        recordFlowSession(branch)
    }
    
    // Monitor knowledge growth
    unprocessedFiles := countFiles(filepath.Join(projectPath, "docs/unprocessed"))
    recordKnowledgeGrowth(unprocessedFiles)
    
    // Detect patterns
    if pattern := detectEnergyPattern(); pattern != nil {
        recordPattern(pattern)
    }
}
```

### 2. Grafana Dashboard Config
```json
{
  "dashboard": {
    "title": "Organic Flow Weather Station",
    "panels": [
      {
        "title": "Current Weather",
        "type": "stat",
        "targets": [{
          "expr": "weather_current_phase"
        }],
        "fieldConfig": {
          "defaults": {
            "mappings": [{
              "type": "value",
              "value": "flow",
              "text": "🌊 Flowing"
            }, {
              "type": "value", 
              "value": "implementation",
              "text": "🔨 Building"
            }]
          }
        }
      },
      {
        "title": "Knowledge Accumulation",
        "type": "graph",
        "targets": [{
          "expr": "knowledge_files_total"
        }],
        "fieldConfig": {
          "defaults": {
            "custom": {
              "lineWidth": 2,
              "fillOpacity": 10
            }
          }
        }
      }
    ]
  }
}
```

### 3. Pattern Recognition Queries
```sql
-- Daily flow patterns
SELECT 
    date_trunc('hour', timestamp) as hour,
    COUNT(*) as edits,
    AVG(edit_velocity) as avg_velocity
FROM flow_events
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY hour
ORDER BY hour;

-- Knowledge connections
SELECT 
    f1.file as source,
    f2.file as target,
    COUNT(*) as connection_strength
FROM file_references f1
JOIN file_references f2 ON f1.session = f2.session
WHERE f1.file LIKE '%unprocessed%'
GROUP BY f1.file, f2.file
HAVING COUNT(*) > 3;
```

### 4. Custom Visualizations

**Flow State Timeline:**
```javascript
// Visual representation of flow sessions
const flowTimeline = {
    data: flowSessions.map(session => ({
        start: session.start,
        end: session.end,
        intensity: session.editVelocity,
        branch: session.branch,
        color: getColorByIntensity(session.editVelocity)
    })),
    layout: {
        title: "Flow Sessions This Week",
        xaxis: { title: "Time" },
        yaxis: { title: "Day" }
    }
};
```

**Knowledge Growth Garden:**
```javascript
// Organic visualization of knowledge accumulation
const knowledgeGarden = {
    type: 'treemap',
    data: [{
        labels: knowledgeFiles.map(f => f.topic),
        values: knowledgeFiles.map(f => f.insights),
        parents: knowledgeFiles.map(f => f.parent || ""),
        text: knowledgeFiles.map(f => `${f.insights} insights`),
        marker: {
            colors: knowledgeFiles.map(f => 
                ageToColor(f.lastModified)
            )
        }
    }]
};
```

### 5. Personal Insights
```markdown
# Generated Weekly Insight
*Week of 2025-01-29*

## Your Flow Patterns
- Best flow times: Tuesday-Thursday mornings
- Average session: 1.5-2 hours
- Sweet spot: 10am-12pm

## Knowledge Themes
This week you explored:
1. Authentication (12 documents)
2. API Design (8 documents)
3. Performance (5 documents)

## Interesting Pattern
You tend to have breakthrough insights after 
45-60 minutes in a flow session. Your "aha!" 
moments cluster around the 1-hour mark.

## Gentle Suggestion
Your afternoon sessions are shorter but often 
contain key decisions. Consider protecting 
post-lunch time for synthesis rather than 
new exploration.
```

## Examples

### Real-Time Weather Widget
```
┌─────────────────────────────────┐
│ 🌤️  Current Weather            │
├─────────────────────────────────┤
│ Phase:    🌊 Flow               │
│ Branch:   flow/api-redesign     │
│ Duration: 1h 23m                │
│ Energy:   ████████░░ High       │
│ Context:  ███████░░░ 73%        │
├─────────────────────────────────┤
│ 💡 3 insights captured          │
│ 📝 Last harvest: 2 hours ago    │
└─────────────────────────────────┘
```

### Pattern Discovery Alert
```
🔍 Pattern Detected!

Your "complexity hotspots" often appear in:
- Controllers after 2pm
- Services during refactoring
- Tests when requirements unclear

This might indicate decision fatigue later
in the day. Consider documenting decisions
in the morning when clarity is highest.
```

### Team Dashboard (Future)
```
Team Flow Synchronicity
━━━━━━━━━━━━━━━━━━━━━━━

Sarah:  ████████░░ (flow/auth)
Marcus: ██░░░░░░░░ (impl/cache)
Alex:   ██████████ (flow/api)

Collaboration Opportunity:
Sarah & Alex both exploring APIs
Consider knowledge sync at 2pm?
```

## Consequences

### Benefits
- **Self-awareness**: Understand your patterns
- **Pattern recognition**: Spot trends early
- **Gentle guidance**: Insights not directives
- **Motivation**: See knowledge grow
- **Team awareness**: Understand collective rhythms

### Considerations
- Avoid gamification
- Respect privacy
- Prevent comparison
- Keep it simple
- Focus on insights

### Healthy Metrics
✅ Knowledge files created
✅ Flow session patterns
✅ Connection density
✅ Harvest frequency
✅ Energy rhythms

### Unhealthy Metrics
❌ Lines of code
❌ Commit count
❌ "Productivity score"
❌ Comparison rankings
❌ Deadline pressure

### Dashboard Principles
1. **Reveal, don't judge**: Show what is, not what should be
2. **Personal, not comparative**: Your patterns, not others'
3. **Gentle, not pushy**: Suggestions, not commands
4. **Beautiful, not clinical**: Organic visualizations
5. **Insightful, not overwhelming**: Key patterns only

## Related Patterns
- [Weather Protocol](../protocols/weather-protocol.md) - Data source
- [Weather Chaser](weather-chaser.md) - Metric collector
- [Temporal Organization](../structure/temporal-organization.md) - Time patterns
- [Organic Development](../core/organic-development.md) - Why these metrics